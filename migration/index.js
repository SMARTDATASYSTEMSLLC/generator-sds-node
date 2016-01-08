'use strict';
var generators = require('yeoman-generator');
var sdsUtils = require('../utils.js');
var lodash = require('lodash');

module.exports = generators.Base.extend({
    constructor: function (args) {
        generators.Base.apply(this, arguments);
        this.lodash = lodash;

        sdsUtils.getNameArg(this, args);
    },
    askFor: function() {
        var cb = this.async();

        var prompts = [];

        sdsUtils.addNamePrompt(this,prompts,'migration');

        if (!prompts.length){
            cb();
            return;
        }

        this.prompt(prompts, function (props) {
            if (props.name){
                this.name = props.name;
            }
            cb();
        }.bind(this));
    },
    files: function () {
        var now = new Date();
        now.setTime(now.getTime() - (now.getTimezoneOffset()*60*1000)); // match knex timezone

        this.name = this.name.replace(/-/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
        this.fs.copyTpl(this.templatePath('migration.js'),   this.destinationPath('./server/migrations/' + now.toISOString().replace(/\D/g, '').substr(0,14) + '_' + this.name + '.js'), this);
    }
});
