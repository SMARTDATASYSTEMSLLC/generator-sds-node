(function(){
    "use strict";

    let common =  require('./common'),
        config = common.config(),
        plugins = common.plugins(),
        Hapi = require('hapi');

    let server = new Hapi.Server({
        connections:{
            router: {
                isCaseSensitive: false,
                stripTrailingSlash: true
            }
        }
    });

    process.chdir(__dirname);

    server.connection({ port: process.env.PORT || config.port, host: config.host });

    server.register(plugins, (err) => {
        if (err) {throw err;}

        //<% if (nodeHasAuth) { %> Enable Authentication
        server.auth.strategy('token', 'jwt', {
            key: config.privateKey,
            validateFunc: (decodedToken, request, callback) => {
                return callback(null, !!decodedToken.id, decodedToken.id ? decodedToken : false);
            }
        });

        //<% } %> Register Routes
        server.register({
            register: require('./local_modules/hapi-router'),
            options: {
                cwd: __dirname,
                routes: 'routes/*-route.js' // uses glob to include files
            }
        }, (err) => {
            if (err) {throw err;}
        });
    });

    server.start(() => {
        console.info('Running node ' + process.version);
        console.info('Server running at:', server.info.uri, ', Environment:', process.env.NODE_ENV || 'local');
    });

})();

