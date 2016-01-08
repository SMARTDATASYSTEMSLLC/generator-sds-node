"use strict";
let path = require('path');
module.exports = [
    {   register: require('inert') },
    {   register: require('vision') }, //<% if (nodeHasAuth) { %>
    {   register: require('hapi-auth-jwt2') }, //<% } %>  Enable Authentication
    {
        register: require('hapi-swagger'),
        options: {
            apiVersion: require('../../package.json').version,
            pathPrefixSize: 2,
            enableDocumentationPage:false,
            authorizations: {
                "token": {
                    type: "apiKey",
                    in: "header",
                    na: "Authorization"
                }
            }
        }
    },
    {
        register: require('../local_modules/hapi-bookshelf-models'),
        options: {
            knex: {
                client: 'pg',
                connection: require('../knexfile.js').qa.connection,
                debug: true,
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
