const connection = require("../db/config.js");
const User = {};
connection.connect();

User.findById = (userId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE student_id = ${userId}`;
        connection.query(sql,(row, err) => {
            if(row) {
                resolve(row);
            } else {
                reject(err);
            }
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
};

User.updateUser = async (userId, nickname, url) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE users SET nickname = ? , img WHERE user_id = ?';
        connection.query(sql, [nickname, url, userId], (err, res) => {
            if(err) { 
                reject(err);
            }else{
                connection.query('SELECT * FROM users  WHERE user_id = ?', userId, (err, row) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            } 
        });
    })
}

module.exports = User;