const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "lostpets",
    database: "lostpets",
    host: "http://lostpets-db.cgtwrl4u4ygc.us-west-2.rds.amazonaws.com/",
    port: 5432
});

module.exports = pool;