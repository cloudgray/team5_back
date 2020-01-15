const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const config = require("./config.js");
const Router = require("./Router");

const app = express();

// 서버 변수 설정
console.log("config.server_port : %d", config.server_port);
app.set("port", process.env.PORT || config.server_port);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: true }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "content-type, x-access-token"); //1
  next();
});
app.use(express.static(path.join(__dirname, "public")));

// logger 사용
app.use(logger("dev"));

// 라우터
app.use("/api", Router);

//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on("uncaughtException", function(err) {
  console.log("uncaughtException 발생함 : " + err);
  console.log("서버 프로세스 종료하지 않고 유지함.");

  console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on("SIGTERM", function() {
  console.log("프로세스가 종료됩니다.");
  app.close();
});

app.on("close", function() {
  console.log("Express 서버 객체가 종료됩니다.");
});

// 시작된 서버 객체를 리턴받도록 합니다.
var server = http.createServer(app).listen(app.get("port"), function() {
  console.log("서버가 시작되었습니다. 포트 : " + app.get("port"));
});
