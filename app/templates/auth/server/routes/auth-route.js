(function() {
    "use strict";

    let Joi = require("joi"),
        Boom = require('boom'),
        AuthService = require('../services/auth-service');

    let reject = function (reply){
        return function (err) {
            console.log('auth', err.stack);
            reply(Boom.wrap(err));
        };
    };

    module.exports = [
        {
            method: "POST",
            path: "/api/auth",
            config: {
                auth: false,
                tags: ['api'],
                validate: {
                    payload: {
                        email: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                if (request.headers.authorization) {
                    reply(Boom.conflict('Already authenticated'));
                } else {
                    new AuthService(request).getAuthToken(request.payload.email, request.payload.password).then(reply, reject(reply));
                }
            }
        },
        {
            method: "POST",
            path: "/api/auth/refresh",
            config: {
                auth: 'token',
                tags: ['api']
            },
            handler: (request, reply) => {
                new AuthService(request).getRefreshToken(request.headers.authorization).then(reply, reject(reply));
            }
        }
    ];
})();
