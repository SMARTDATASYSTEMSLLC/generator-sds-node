(function(){
    "use strict";

exports.getServer = function getServer (cb){
    let common =  require('../common');
    let config = common.config('test');
    let plugins = common.plugins('test');

    let Hapi = require('hapi');
    let auth = require("../services/auth");
    let server = new Hapi.Server();


    server.connection({ port: config.port });

    server.register(plugins, (err) => {
        if (err) {throw err;}

        // Enable Authentication
        server.auth.strategy('token', 'jwt', {
            key: config.privateKey,
            validateFunc: (decodedToken, request, callback) => {
                return callback(null, !!decodedToken.id, decodedToken.id ? decodedToken : false);
            }
        });

        server.register({
            register: require('../local_modules/hapi-router'),
            options: {
                cwd: __dirname,
                routes: '../routes/*-route.js' // uses glob to include files
            }
        }, (err) => {
            if (err) { throw err; }
        });

            cb(err, server);
    });
};
})();

exports.getToken = function getToken(server, email, password, cb) {
    let JWT  = require('jsonwebtoken');
    server.inject({
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        url: '/api/auth',
        payload: {
            email: email,
            password: password
        }
    }, function (res) {
        let user = JWT.decode(res.result.token);

        cb('Bearer ' + res.result.token, user);
    });
};

exports.rollback = function rollback(server, cb) {
    let Promise = require('bluebird');

        cb();
};

