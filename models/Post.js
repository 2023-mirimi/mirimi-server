const { resolve } = require('path');
const conn = require('../db/config');
const Post = {};

Post.addPost = (userId, nickname, post) => {
    return new Promise((resolve, reject) => {
        // let upload_date = CURRENT_TIMESTAMP();
        let sql = 'INSERT INTO posts (user_id, nickname, title, category, content, upload_date) VALUES(?, ?, ?, ?, ?, ?)';
        conn.query(sql, [userId, nickname, post.title, post.category, post.content, post.date], (err, res) => {
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

Post.getAll = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM posts ORDER BY upload_date DESC';
        conn.query(sql, (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

Post.getPost = (postID) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM posts WHERE post_id = ?';
        conn.query(sql, postID,(err, row) => {
            if(err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

module.exports = Post;