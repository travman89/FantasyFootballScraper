const positionConstants: any = {
  all: {
    length: 2,
    url: process.env.TOP_160,
    standardFile: "allStandard.csv",
    pprFile: "allPPR.csv",
    csvHeaing: [
      { id: "rank", title: "rank" },
      { id: "name", title: "name" },
      { id: "position", title: "position" },
    ],
  },
  qb: {
    length: 1,
    url: process.env.QB_URL,
    standardFile: "qbStandard.csv",
    csvHeaing: [
      { id: "rank", title: "rank" },
      { id: "name", title: "name" },
      { id: "team", title: "team" },
    ],
  },
  rb: {
    length: 2,
    url: process.env.RB_URL,
    standardFile: "rbStandard.csv",
    pprFile: "rbPPR.csv",
    csvHeaing: [
      { id: "rank", title: "rank" },
      { id: "name", title: "name" },
      { id: "team", title: "team" },
    ],
  },
  wr: {
    length: 2,
    url: process.env.WR_URL,
    standardFile: "wrStandard.csv",
    pprFile: "wrPPR.csv",
    csvHeaing: [
      { id: "rank", title: "rank" },
      { id: "name", title: "name" },
      { id: "team", title: "team" },
    ],
  },
  te: {
    length: 1,
    url: process.env.TE_URL,
    standardFile: "teStandard.csv",
    pprFile: "tePPR.csv",
    csvHeaing: [
      { id: "rank", title: "rank" },
      { id: "name", title: "name" },
      { id: "team", title: "team" },
    ],
  },
  def: {
    length: 1,
    url: process.env.DEF_URL,
    standardFile: "defStandard.csv",
    csvHeaing: [
      { id: "rank", title: "rank" },
      { id: "name", title: "name" },
      { id: "team", title: "team" },
    ],
  },
};

interface playerData {
  name: string;
  rank: number;
  thirdOption?: string;
  position?: string;
  team?: string;
}

interface ParsePlayerData {
  name: string;
  rank: number;
  position?: string;
  team?: string;
  standardRank?: number | string;
  pprRank?: number;
}

interface RowData {
  name: string;
  rank: string;
  team?: string;
  position?: string;
}

type PlayerObject = { [key: string]: ParsePlayerData };
export {
  positionConstants,
  playerData,
  ParsePlayerData,
  RowData,
  PlayerObject,
};
