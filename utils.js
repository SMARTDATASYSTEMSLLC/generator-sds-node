var path = require('path');
var fs = require('fs');
var _ = require('lodash');

module.exports.getNameArg = function(that,args){
    if (args.length > 0){
        that.name = args[0];
    }
};

module.exports.addNamePrompt = function(that,prompts,type){

    if (!that.name){
        prompts.splice(0,0,{
            name:'name',
            message: 'Enter a name for the ' + type + '.',
            validate: function(input){
                return true;
            }
        });
    }
};

