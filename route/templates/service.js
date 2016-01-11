(function () {
    "use strict";

    let Promise = require("bluebird"),
        _ = require('lodash'),
        Base = require('./base'),
        Boom = require('boom');

    module.exports = class <%= classname + 'Service' %> extends Base {
        constructor(request) {
            super(request);
        }

        <%= 'getAll' + classname %> () {
            return Promise.resolve({});
        }

        <%= 'create' + classname %> (model) {
            return Promise.resolve({});
        }
    };
})();
