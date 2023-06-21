const router = require('express').Router();
const community = require('../controllers/community');

router.get('/', community.getPostAll) //게시글 db 가져오기
//id는 post_id
router.get('/:id', community.getPost) //게시글 db 가져오기
router.get('/reply/:id', community.getReply) //게시글 댓글 가져오기
router.post('/', community.setPost) //게시글 db 추가하기
router.post('/:id', community.addReply)
//카테고리별로 데이터 가져오기
// router.get('/:category', community.getPostByCategory)
module.exports = router;