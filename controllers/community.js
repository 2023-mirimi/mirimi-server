const Post = require("../models/Post");

module.exports.addReply = async (req, res) => {
    try {
        const postID = req.params.id;
        const reply = req.body.replyValue;
        const data = {
            post_id: postID,
            nickname: req.session.user.nickname,
            reply_content: reply,
            reply_date: new Date().toLocaleString()
        }
        console.log(data);
        const result = await Post.addReply(data);
        res.json(result);
    } catch (error) {
        console.log('커뮤니티 addREply 에러 ', error);
    }
}

module.exports.getPost = async (req, res) => {
    try {
        //댓글과 게시글 가져오기 
        const post = await Post.getPost(postID);
        // console.log(reply);
        res.json(post);
    } catch (error) {
        console.log('커뮤니티 컨트롤러: ', error);
    }
}
module.exports.getReply = async (req, res) => {
    try {
        const postID = req.params.id;
        const reply = await Post.getReplyAll(postID);
        res.json(reply);
    } catch (error) {
        console.log('커뮤니티 컨트롤러(getReply 에러)', error);
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

module.exports.getPostByCategory = async (req, res) => {
    try {
        const param = req.params.category;
        let category = '';

        if(param == 'daily'){
            category = '일상';
        } else if(param == 'employment'){
            category = '취업';
        } else if(param == 'school'){
            category = '학교';
        } else if(param == 'contest') {
            category = '공모전';
        } else {
            let rows = await Post.getAll();
            res.status(200).json(rows);
            return;
        }
        let rows = await Post.getPostByCategory(category);
        console.log(rows[0]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
}