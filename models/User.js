const dbConfig = require('../db/config.js');
const oracledb = require('oracledb');
oracledb.autoCommit = true; 

async function run() {
    try {
        // const connection = await oracledb.getConnection(dbConfig);
        await oracledb.getConnection({
            connectString: dbConfig.connectString,
            user: dbConfig.user,
            password: dbConfig.password
        }).then(conn => {
            const result =  conn.execute('SELECT * FROM users;');
            console.log(result.rows);
        }).catch(err => {
            console.log('db 연결 실패', err)
        })
    } catch (error) {
        console.log(error)
    }
}

run();