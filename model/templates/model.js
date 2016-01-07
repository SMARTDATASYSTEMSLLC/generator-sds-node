(function() {
    "use strict";

    module.exports = function (baseModel, bookshelf) {
        return baseModel.extend({
            tableName: '<%= name %>',
            hasTimestamps: true
        });
    };
})();
