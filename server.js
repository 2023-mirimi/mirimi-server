const express = require("express");
const app = express();
const dotenv = require("dotenv"); //.env 파일에 접근 가능한 모듈
dotenv.config();

const oracledb = require("oracledb");
const dbConfig = require("./db/config.js");

// 라우터 폴더 분리 따로 -> 진이가 한대~!~!~!~
app.listen(3000, () => {
  console.log("Start Sever : localhost:3000");
});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get("/db", function (req, res) {
  // DB Select
  selectDatabase();

  // 화면에 보여줄 txt
  res.send("연결이다!!!!!!!");
});

// DB Select
async function selectDatabase() {
  console.log("!!!!! db conenction !!!!!");
  console.log(dbConfig.user);
  console.log(dbConfig.password);

  let connection = await oracledb.getConnection(dbConfig);

  let binds = {};
  let options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
  };

  console.log("!!!!! db select !!!!!");

  let result = await connection.execute("select * from POST2", binds, options);

  console.log("!!!!! db response !!!!!");
  console.log(result.rows[0]);

  console.log("!!!!! db close !!!!!");
  await connection.close();
}

function init() {
  oracledb.initOracleClient({ libDir: "" });
}

init();
