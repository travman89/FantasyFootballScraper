import axios from "axios";
import cheerio from "cheerio";
import "dotenv/config";
import { positionConstants, playerData } from "./constants";
import { parseRowDataByPosition, writeRanks } from "./helpers";

const AxiosInstance = axios.create();

let standardRankings: playerData[] = [];
let fullPPRRankings: playerData[] = [];

const scrapePosition = async (positionKey: string) => {
  await AxiosInstance.get(positionConstants[positionKey].url)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const rankingTables = $("table > tbody");
      for (let i = 0; i < rankingTables.length; i++) {
        const rows = $(rankingTables[i]).find("> tr");
        const parsedRows: playerData[] = [];
        rows.each((i, player) => {
          const rank: number = parseInt(
            $(player).find(" td:nth-child(1)").text()
          );
          const name: string = $(player).find(" td:nth-child(2)").text();
          const thirdOption: string = $(player).find(" td:nth-child(3)").text();
          if (name) {
            parsedRows.push(
              parseRowDataByPosition({ name, rank, thirdOption }, positionKey)
            );
          }
        });
        if (i === 0) {
          standardRankings =
            rankingTables.length > 1
              ? [...parsedRows.slice(1)]
              : [...parsedRows];
          writeRanks(i, standardRankings, positionKey);
        } else {
          fullPPRRankings =
            rankingTables.length > 1
              ? [...parsedRows.slice(1)]
              : [...parsedRows];
          writeRanks(i, fullPPRRankings, positionKey);
        }
      }
    })
    .catch(console.error);
};

const main = async () => {
  await scrapePosition("wr");
  await scrapePosition("rb");
  await scrapePosition("qb");
  await scrapePosition("te");
  await scrapePosition("def");
};

main();
