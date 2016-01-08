"use strict";
let path = require('path');
module.exports = [
    {   register: require('inert') }, //<% if (nodeHasAuth) { %>
    {   register: require('hapi-auth-jwt2') }, //<% } %>  Enable Authentication
    {
        register: require('../local_modules/hapi-bookshelf-models'),
        options: {
            knex: {
                client: 'pg',
                connection: require('../knexfile.js').production.connection,
                migrations: {
                    tableName: 'migrations'
                },
                seeds:{
                    directory: path.join(__dirname, '../fixtures')
                }
            },
            plugins: ['registry', 'visibility', 'virtuals'], // Required
            models: path.join(__dirname, '../models')
        }
    }
];
