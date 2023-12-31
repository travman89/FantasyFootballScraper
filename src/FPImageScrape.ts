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

AxiosInstance.get(
  "https://www.fantasypros.com/nfl/rankings/ros-half-point-ppr-overall.php"
)
  .then((res) => {
    const playerImages: string[] = [];
    const html = res.data;
    const scrapedData = findTextAndReturnRemainder(html, "var ecrData =");
    const result = JSON.parse(scrapedData);
    const rawPlayerData = result["players"];
    for (const image of rawPlayerData) {
      playerImages.push(image["player_square_image_url"]);
    }
    fs.writeFileSync(
      `FP-player-image-data.json`,
      JSON.stringify(playerImages.filter((i) => i))
    );
  })
  .catch(console.error);
