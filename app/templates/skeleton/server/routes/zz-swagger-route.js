(function() {
    "use strict";
    let path = require('path');
    module.exports = [
        {
            method: 'GET',
            path: '/documentation',
            handler: (request, reply) =>{
                reply.file(path.join(__dirname, '../public/index.html'));
            }
        }
    ];
})();
