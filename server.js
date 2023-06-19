const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require("dotenv"); //.env 파일에 접근 가능한 모듈
const cors = require('cors');
// var path = require('path');
const crypto = require('crypto');
dotenv.config({
  path: './.env'
});

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const accountRouter = require('./routes/account');
const communityRouter = require('./routes/community');
const path = require("path");
const { fstat } = require("fs");

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(session({
  secret: generateSecret(),
  resave: false,
  saveUninitialized: true
}))

app.set('port', process.env.port);

app.use('/account', accountRouter);
app.use('/community', communityRouter);

app.listen(app.get('port'), () => {
  console.log("Start Sever : localhost:",app.get('port'));
});
