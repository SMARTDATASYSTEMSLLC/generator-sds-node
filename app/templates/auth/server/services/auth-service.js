(function () {
    "use strict";
    let Promise = require('bluebird'),
        jwt = require('jsonwebtoken'),
        config = require("../common.js").config(),
        Base = require("./base"),
        bcrypt = require('bcryptjs'),
        Boom = require('boom');

    Promise.promisifyAll(bcrypt);

    function signToken(user) {
        let opt = {
            expiresIn: config.tokenExpiration * 60,
            issuer: config.tokenIssuer
        };
        return jwt.sign(user, config.privateKey, opt);
    }
    module.exports = class AuthService extends Base {
        constructor(request) {
            super(request);
        }

        getAuthToken (email, password) {
            const user = {
                id:0,
                email: 'admin@smartdatasystems.net',
                password: '!QAZ2wsx'
            };

            //return bcrypt.compareAsync(password, db_password).then(res => { if (res) {
                if(user.email === email && user.password === password){
                    return {token: signToken(user)};
                } else {
                    return Promise.reject(Boom.unauthorized("Not authorized - please check your username and/or password"));
                }
            //}});

        }
        getRefreshToken (authToken) {
            const user = {
                id:0,
                email: 'admin@smartdatasystems.net',
                password: '!QAZ2wsx'
            };
            if (authToken) {
                let currentToken = authToken.split(" ");
                if (currentToken && currentToken.length > 0) {
                    let profile = jwt.verify(currentToken[1], config.privateKey);
                    if (profile) {
                        return {token: signToken(user)};
                    }
                }
            }

            return Promise.reject(Boom.unauthorized("Not authorized - your login has expired"));

        }
    };
})();
