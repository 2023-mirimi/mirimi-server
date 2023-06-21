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
                console.log(err);
                reject(err);
            } else {
                resolve(row);
                console.log('게시글 하나 가져오기!')
                conn.query('UPDATE posts SET post_views = post_views + 1 WHERE post_id = ?', postID, (err, row) => {
                    if(err) reject(err)
                })
            }
            
        })
    })
}
Post.getReplyAll = (postID) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM reply WHERE post_id = ?';
        conn.query(sql, postID, (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(rows)
            }
        })
    })
}
Post.addReply = (reply) => {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO reply (post_id, nickname, reply_content, reply_date, reply_profile) VALUES(?,?,?,?,?)';
        //[reply.post_id, reply.nickname, reply.reply_content, reply.reply_date]
        conn.query(sql, [reply.post_id, reply.nickname, reply.reply_content, reply.reply_date,reply.reply_profile], (err, res) => {
            if(err){
                reject(err);
            } else {
                let sql = 'UPDATE posts SET comments = comments +1 WHERE post_id = ?';
                conn.query(sql, [reply.post_id], (updateErr, updateRes) => {
                    if(err) {
                        reject(updateErr);
                    }
                    resolve(updateRes);
                })
            } 
        })
    })
}
Post.getPostByCategory = (category) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM posts WHERE category = ? ORDER BY upload_date DESC';
        conn.query(sql, category, (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(rows)
            }
        });
    })
}

module.exports = Post;