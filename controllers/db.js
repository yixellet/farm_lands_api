const pgp = require('pg-promise')();
const { host, port, dbname, user, pass } = require('../config/db.config');

const db = pgp(`postgres://${user}:${pass}@${host}:${port}/${dbname}`);

module.exports = { db };
