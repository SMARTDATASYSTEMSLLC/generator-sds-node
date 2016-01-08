// Update with your config settings.
var path = require('path');
module.exports = {
    local: {
        client: 'postgresql',
        connection: {
            host: '????.us-east-1.rds.amazonaws.com',
            user: 'user',
            password: 'password',
            database: 'database',
            port: 5432
        },
        debug: true,
        migrations: {
            tableName: 'migrations'
        },
        seeds: {
            directory: path.join(__dirname, './fixtures')
        },
        pool: {
            min: 0,
            max: 1
        }
    },
    test: {
        client: 'postgresql',
        connection: {
            host: '????.us-east-1.rds.amazonaws.com',
            user: 'user',
            password: 'password',
            database: 'database',
            port: 5432
        },
        debug: true,
        migrations: {
            tableName: 'migrations'
        },
        seeds: {
            directory: path.join(__dirname, './fixtures')
        },
        pool: {
            min: 0,
            max: 1
        }
    },
    qa: {
        client: 'postgresql',
        connection: {
            host: '????.us-east-1.rds.amazonaws.com',
            user: 'user',
            password: 'password',
            database: 'database',
            port: 5432
        },
        debug: true,
        migrations: {
            tableName: 'migrations'
        },
        seeds: {
            directory: path.join(__dirname, './fixtures')
        },
        pool: {
            min: 0,
            max: 1
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: '?????.us-east-1.rds.amazonaws.com',
            user: 'user',
            password: 'password',
            database: 'database',
            port: 5432
        },
        migrations: {
            tableName: 'migrations'
        },
        seeds: {
            directory: path.join(__dirname, './fixtures')
        },
        pool: {
            min: 0,
            max: 1
        }
    }
};
