const csv = require("csv-parser");
import {
  positionConstants,
  ParsePlayerData,
  RowData,
  PlayerObject,
} from "./constants";
import { getStandardPositionData, writeJSONRanks } from "./helpers";
const fs = require("fs");

const positionKey: string = process.argv[2];

const standardRanks: PlayerObject = {};
const pprRanks: PlayerObject = {};
const halfRanks: ParsePlayerData[] = [];
const playerMap: PlayerObject = {};

function compare(a: ParsePlayerData, b: ParsePlayerData) {
  return a.rank - b.rank;
}

const cumulativeStandardRankRow = (row: RowData) => {
  if (!standardRanks[row.name.toLowerCase()]) {
    standardRanks[row.name.toLowerCase()] = {
      rank: parseInt(row.rank, 10),
      name: row.name,
      ...getStandardPositionData(row, positionKey),
    };
    playerMap[row.name.toLowerCase()] = {
      rank: parseInt(row.rank, 10),
      name: row.name,
      standardRank: parseInt(row.rank, 10),
      ...getStandardPositionData(row, positionKey),
    };
    if (positionConstants[positionKey].length === 1) {
      halfRanks.push({
        rank: parseInt(row.rank, 10),
        name: row.name,
        ...getStandardPositionData(row, positionKey),
      });
    }
  }
};

const cumulativePPRRankRow = (row: RowData) => {
  if (!pprRanks[row.name.toLowerCase()]) {
    pprRanks[row.name.toLowerCase()] = {
      rank: parseInt(row.rank, 10),
      name: row.name,
      ...getStandardPositionData(row, positionKey),
    };
  }
  if (playerMap[row.name.toLowerCase()]) {
    playerMap[row.name.toLowerCase()] = {
      ...playerMap[row.name.toLowerCase()],
      pprRank: parseInt(row.rank, 10),
    };
  } else {
    playerMap[row.name.toLowerCase()] = {
      rank: parseInt(row.rank, 10),
      name: row.name,
      standardRank: "-",
      pprRank: parseInt(row.rank, 10),
      ...getStandardPositionData(row, positionKey),
    };
  }
};

const combineLists = () => {
  for (const player in standardRanks) {
    if (standardRanks[player] && pprRanks[player]) {
      const combinedRank =
        (standardRanks[player].rank + pprRanks[player].rank) / 2;
      halfRanks.push({
        name: standardRanks[player].name,
        rank: combinedRank,
        standardRank: playerMap[player].standardRank,
        pprRank: playerMap[player].pprRank,
        ...getStandardPositionData(standardRanks[player], positionKey),
      });
    }
  }

  halfRanks.sort(compare);
  for (var i = 0; i < halfRanks.length; i++) {
    halfRanks[i].rank = i + 1;
  }
  writeJSONRanks(positionKey, halfRanks);
};

const pprStream = () => {
  fs.createReadStream(`src/data/${positionKey}PPR.csv`)
    .pipe(csv())
    .on("data", (row: RowData) => {
      cumulativePPRRankRow(row);
    })
    .on("end", () => {
      combineLists();
    });
};

const standardStream = () => {
  const file = `src/data/${positionKey}Standard.csv`;
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (row: RowData) => {
      cumulativeStandardRankRow(row);
    })
    .on("end", () => {
      if (positionConstants[positionKey].length === 2) {
        pprStream();
      } else {
        writeJSONRanks(positionKey, halfRanks);
      }
    });
};

standardStream();
