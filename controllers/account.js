const User = require('../models/User');
const multer = require('multer');
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
const upload = multer({ storage: multer.memoryStorage() });
const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        // const stduentID = req.body.stduent_id;
        const password = req.body.pw;
        const data =  await User.login(email, password);
        // console.log(data);
        if(data.length == 0){ //로그인 실패
            return res.json(false);
        } else { //로그인 성공
            // res.redirect
            req.session.user = data[0];
            req.session.save();
            return res.status(200).json(req.session.user);
        }
    } catch(err){
        console.log('컨트롤러 실패:', err)
        return res.json(err);
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const user = req.session.user;
        console.log(user);
        res.json(user);
    } catch (error) {
        console.log('유저 정보 가져오기 실패 -> ', error);
    }
}

module.exports.editUser = async (req, res) => {
    try {
        const nickname = req.body.nickname;
        const img = req.file;
        const userId = req.session.user.user_id;
        const upload = new Upload({
            client: client,
            params: {
              Bucket: process.env.AWS_BUCKET,
              Key: `profile/user_${userId}.png`,
              Body: img.buffer,
              ContentType: img.mimetype,
            },
        });
        upload.done();
        let img_url = `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/profile/user_${userId}.png`;
        res.status(200).send({ message: "ok", url: img_url, nickname: nickname });

    } catch (error) {
        res.json(error);
    }
}