const User = require('../models/User');

module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        // const stduentID = req.body.stduent_id;
        const password = req.body.pw;
        const data =  await User.login(email, password);
        console.log(data);
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