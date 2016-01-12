(function () {
    "use strict";
    let Boom = require('boom');
    let Joi = require("joi");
    let <%= classname + 'Service' %> = require('../services/<%= name %>-service.js');

    let reject = function (reply) {
        return function (err) {
            console.log('<%= name %>', err.stack);
            reply(Boom.wrap(err));
        };
    };

    module.exports = [
        {
            method: "GET",
            path: "/api/<%= name %>",
            config: {
                auth: false, //'token',
                tags: ['api']
            },
            handler: (request, reply) => {
                return new <%= classname + 'Service' %>(request).<%= 'getAll' + classname %>().then(reply, reject(reply));
            }
        },
        {
            method: "POST",
            path: "/api/<%= name %>",
            config: {
                auth: false, //'token',
                tags: ['api'],
                validate: {
                    payload: {}
                }
            },
            handler: (request, reply) => {
                return new <%= classname + 'Service' %>(request).<%= 'create' + classname %>(request.payload).then(reply, reject(reply));
            }
        }
    ];
})();
