'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var sdsUtils = require('../utils.js');
var mkdirp = require('mkdirp');
var lodash = require('lodash');
var jsonFile = require('jsonfile');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    constructor: function (){
        generators.Base.apply(this, arguments);
        this.lodash = lodash;
    },
    askFor: function () {
        var cb = this.async();

        this.prompt({
            name: 'appname',
            message: 'What would you like the node app/module name to be?',
            default: path.basename(process.cwd())
        }, function (props) {
            this.appname = props.appname;
            cb();
        }.bind(this));
    },
    askForAppPath: function() {
        var cb = this.async();

        this.prompt({
            name: 'distdir',
            message: 'Where do you want the static folder?',
            default: 'client/dist'
        }, function (props) {
            this.distdir = props.distdir;
            cb();
        }.bind(this));
    },
    askForAuth: function () {
        var cb = this.async();

        this.prompt({
            name: 'router',
            type:'list',
            message: 'Do you want to include JWT authentication?',
            default: 0,
            choices: ['Yes','No']
        }, function (props) {
            this.nodeHasAuth = props.router === 'Yes';
            this.localKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            this.qaKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            this.prodKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });

            this.config.set('nodeHasAuth',this.nodeHasAuth);
            cb();
        }.bind(this));
    },
    app: function() {
        var cb = this.async();
        mkdirp.sync('./' + this.distdir);

        this.fs.copy   (this.templatePath('skeleton/'),this.destinationPath('./'), { globOptions: {dot:true}});
        this.fs.copyTpl(this.templatePath('templates/env.json'),   this.destinationPath('./server/env.json'), this);
        this.fs.copyTpl(this.templatePath('templates/server.js'),   this.destinationPath('./server/server.js'), this);
        this.fs.copyTpl(this.templatePath('templates/package.json'), this.destinationPath('package.json'), this);
        this.fs.copyTpl(this.templatePath('templates/plugins/'),this.destinationPath('./server/plugins/'), this);
        if (this.nodeHasAuth){
            this.fs.copyTpl(this.templatePath('auth/'),    this.destinationPath('./'), this);
        }

        //move app dir to correct location

        this._writeFiles(cb)
    },
    npm: function(){
        this.npmInstall([
            "JSONStream",
            "async",
            "bcryptjs",
            "bluebird",
            "bookends",
            "bookshelf",
            "boom",
            "cast-array",
            "glob",
            "handlebars",
            "hapi",
            "hapi-auth-jwt2",
            "hapi-io",
            "hapi-swagger@2",
            "hoek",
            "inert",
            "install",
            "ip",
            "joi",
            "jsonwebtoken",
            "knex",
            "lodash",
            "moment",
            "npm",
            "pg",
            "pre-git",
            "socket.io",
            "stream-transform",
            "through",
            "vision"
        ], {save: true});
    }
});

