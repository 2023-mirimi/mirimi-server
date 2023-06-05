const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.HOST,
};