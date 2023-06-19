const connection = require("../db/config.js");
const User = {};

User.findById = (userId) => {
    return new Promise((resolve, reject) => {
        connection.connect();
        let sql = `SELECT * FROM users WHERE student_id = ${userId}`;
        connection.query(sql,(row, err) => {
            if(row) {
                resolve(row);
            } else {
                reject(err);
            }
            // connection.end();
        });
    })
};
User.login = async (email, pw) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${pw}';`;
        connection.query(sql,(err, row) => {
            if(err) {
                console.log('모델 문제')
                reject(err);
            } else {
                // console.log('결과:', row[0]);
                // if(row.length == 0) row = "fail";
                resolve(row);
            }
        });
    })
    connection.end();
};

module.exports = User;
// module.exports = async function showUser(userId) {
//     try {
//         connection.connect();
//         let sql = `SELECT * FROM users WHERE student_id = ${userId}`;
//         connection.query(sql,(err, row) => {
//             if(err){
//                 console.log(err);
//             }
//             console.log(row[0]);
//             connection.end();
//         })
//     } catch (err) {
//         console.log('showUser() 실패',err);
//     }
// }

