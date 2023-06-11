const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv"); //.env 파일에 접근 가능한 모듈
const cors = require('cors');
dotenv.config();
const accountRouter = require('./routes/account');

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.set('port', process.env.port);
app.use('/account', accountRouter);

app.listen(app.get('port'), () => {
  console.log("Start Sever : localhost:",app.get('port'));
});
