import axios from "axios";
import cheerio from "cheerio";
import "dotenv/config";
import { positionConstants, playerData } from "./constants";
import { parseRowDataByPosition, writeRanks } from "./helpers";
const fs = require("fs");

const findTextAndReturnRemainder = (target: any, variable: any): any => {
  var chopFront: any = target.substring(
    target.search(variable) + variable.length,
    target.length
  );
  var result = chopFront.substring(0, chopFront.search(";"));
  return result;
};

const AxiosInstance = axios.create({
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

let standardRankings: playerData[] = [];
let fullPPRRankings: playerData[] = [];

AxiosInstance.get(
  "https://www.fantasypros.com/nfl/rankings/ros-half-point-ppr-overall.php"
)
  .then((res) => {
    const html = res.data;
    const playerData = findTextAndReturnRemainder(html, "var ecrData =");
    const result = JSON.parse(playerData);
    fs.writeFileSync(`FP-sample-data.json`, JSON.stringify(result));
  })
  .catch(console.error);
