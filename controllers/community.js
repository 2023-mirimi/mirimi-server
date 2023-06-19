const Post = require("../models/Post");

module.exports.getPost = async (req, res) => {
    try {
        const postID = req.params.id;
        const row = await Post.getPost(postID);
        res.json(row);
    } catch (error) {
        console.log('커뮤니티 컨트롤러: ', error);
    }
}

module.exports.getPostAll = async (req, res) => {
    try {
        const rows = await Post.getAll();
        // console.log(rows)
        res.json(rows);
    } catch (error) {
        res.status(404).json(error);
    }
}

module.exports.setPost = async (req, res) => {
    try {
        //제목, 카테고리, 내용, 이미지url
        let date = new Date();
        const post = {
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            date: date.toLocaleString(),
        }
        // console.log(post);
        const nickname = req.session.user.nickname;
        const userId = req.session.user.user_id;
        const result = await Post.addPost(userId, nickname, post);
        // res.json(result);
        console.log(result);
    } catch (error) {
        console.log('커뮤니티 컨트롤러 에러 : ', error)
        res.status(401).json(error);    
    }
}