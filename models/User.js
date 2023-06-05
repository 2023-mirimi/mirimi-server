const dbConfig = require("../db/config.js");
const oracledb = require("oracledb");
oracledb.autoCommit = true;

async function run() {
  let binds = {};
  let options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
  };

  try {
    // const connection = await oracledb.getConnection(dbConfig);
    await oracledb
      .getConnection({
        connectString: "localhost:1521/xe",
        user: dbConfig.user,
        password: dbConfig.password,
      })
      .then((conn) => {
        const result = conn.execute("SELECT * FROM POST2", binds, options);
        console.log(result.rows[0]);
      })
      .catch((err) => {
        console.log("db 연결 실패", err);
      });
  } catch (error) {
    console.log(error);
  }
}

run();
