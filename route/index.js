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

        sdsUtils.addNamePrompt(this,prompts,'route');

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
        this.name = this.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        this.classname =  lodash.capitalize(lodash.camelCase(this.name));
        this.fs.copyTpl(this.templatePath('route.js'),   this.destinationPath('./server/routes/' + this.name + '-route.js'), this);
        this.fs.copyTpl(this.templatePath('service.js'),   this.destinationPath('./server/services/' + this.name + '-service.js'), this);
        this.fs.copyTpl(this.templatePath('test.js'),   this.destinationPath('./server/test/' + this.name + '-route.test.js'), this);
    }
});
