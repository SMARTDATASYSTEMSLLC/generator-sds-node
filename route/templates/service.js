(function () {
    "use strict";

    let Promise = require("bluebird"),
        _ = require('lodash'),
        Base = require('./base'),
        Boom = require('boom');

    module.exports = class <%= lodash.camelCase(name) + 'Service' %> extends Base {
        constructor(request) {
            super(request);
        }

        <%= 'getAll' + lodash.camelCase(name) %> () {
            return Promise.resolve({});
        }

        <%= 'create' + lodash.camelCase(name) %> (model) {
            return Promise.resolve({});
        }
    };
})();
