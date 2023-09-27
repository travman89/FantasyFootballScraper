import {
  positionConstants,
  playerData,
  RowData,
  ParsePlayerData,
} from "./constants";
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeRanks = async (
  index: number,
  ranks: playerData[],
  positionKey: string
) => {
  const csvWriter = createCsvWriter({
    path:
      index === 0
        ? positionConstants[positionKey].standardFile
        : positionConstants[positionKey].pprFile,
    header: positionConstants[positionKey].csvHeaing,
  });
  csvWriter
    .writeRecords(ranks)
    .then(() =>
      console.log(`${positionKey} ranks CSV file was written successfully`)
    )
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
};

const parseRowDataByPosition = (data: playerData, positionKey: string) => {
  if (positionKey === "ros") {
    return {
      rank: data.rank,
      name: data.name,
      position: data.thirdOption?.replace(" ", ""),
    };
  } else {
    return {
      rank: data.rank,
      name: data.name,
      team: data.thirdOption?.replace(" ", ""),
    };
  }
};

const writeJSONRanks = (positionKey: string, halfRanks: playerData[]) => {
  fs.writeFileSync(`${positionKey}.json`, JSON.stringify(halfRanks));
  console.log(`writing ${positionKey}.json`);
};

const getStandardPositionData = (
  row: ParsePlayerData | RowData,
  positionKey: string
) => {
  if (positionKey === "ros") {
    return { position: row.position };
  } else {
    return { team: row.team };
  }
};

export {
  writeRanks,
  parseRowDataByPosition,
  writeJSONRanks,
  getStandardPositionData,
};
