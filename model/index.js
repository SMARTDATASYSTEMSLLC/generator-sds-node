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

        sdsUtils.addNamePrompt(this,prompts,'model');

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
        var modelname = lodash.capitalize(lodash.camelCase(this.name));
        this.fs.copyTpl(this.templatePath('model.js'),   this.destinationPath('./server/models/' + modelname + '.js'), this);
    }
});
