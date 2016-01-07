"use strict";
let Boom = require('boom');

class BaseService {
    constructor(request){
        if (request.server){
            this.server = request.server;
        }else{
            this.server = request;
        }
        this.Bookshelf = this.server.plugins.bookshelf;
        this.knex = this.Bookshelf.knex;
        this.credentials = request.auth && request.auth.credentials;

        this.payload = request.payload;
        this.params = request.params;
    }

    getModel(name) {
        return this.Bookshelf.model(name);
    }
}
module.exports = BaseService;
