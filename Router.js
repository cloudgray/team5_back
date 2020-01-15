const Router = require("express").Router();

Router.get("/data", (req, res) => {
  console.log("GET /api/data called");
  const result = getData(data);
  res.status(200).json(result);
});

Router.post("/data", (req, res) => {
  const result = updateData(data);
  res.status(200).json(result);
});

// 함수들
const updateData = data => {
  let index = Math.floor(Math.random() * 7);
  let justTest = Math.random() * 10 > 3 ? true : false;
  if (justTest) {
    data[index.testCnt] += 1;
  } else {
    data[index.purchaseCnt] += 1;
  }

  return data;
};

const getData = () => {
  return data;
};

let data = [
  {
    id: 1,
    name: "코듀로이베이지",
    color: "#C3574D",
    testCnt: 184,
    purchaseCnt: 80
  },
  {
    id: 2,
    name: "브라운실루엣",
    color: "#A52021",
    testCnt: 256,
    purchaseCnt: 39
  },
  {
    id: 3,
    name: "브릿지코랄",
    color: "#C63A39",
    testCnt: 0,
    purchaseCnt: 0
  },
  {
    id: 4,
    name: "피치코랄",
    color: "#DF2336",
    testCnt: 471,
    purchaseCnt: 162
  },
  {
    id: 5,
    name: "코랄아이콘",
    color: "#DF3F32",
    testCnt: 483,
    purchaseCnt: 75
  },
  {
    id: 6,
    name: "페스티벌레드",
    color: "#D7000F",
    testCnt: 493,
    purchaseCnt: 36
  },
  {
    id: 7,
    name: "레드파우치",
    color: "#9D0004",
    testCnt: 284,
    purchaseCnt: 35
  }
];

module.exports = Router;