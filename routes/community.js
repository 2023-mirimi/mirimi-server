const router = require('express').Router();
const community = require('../controllers/community');

router.get('/', community.getPostAll) //게시글 db 가져오기
router.get('/:id', community.getPost) //게시글 db 가져오기
router.post('/', community.setPost) //게시글 db 가져오기

module.exports = router;