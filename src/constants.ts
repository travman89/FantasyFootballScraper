const baseHeading = [
  { id: "rank", title: "rank" },
  { id: "name", title: "name" },
  { id: "team", title: "team" },
];
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
    csvHeaing: [...baseHeading],
  },
  rb: {
    length: 2,
    url: process.env.RB_URL,
    standardFile: "rbStandard.csv",
    pprFile: "rbPPR.csv",
    csvHeaing: [...baseHeading],
  },
  wr: {
    length: 2,
    url: process.env.WR_URL,
    standardFile: "wrStandard.csv",
    pprFile: "wrPPR.csv",
    csvHeaing: [...baseHeading],
  },
  te: {
    length: 1,
    url: process.env.TE_URL,
    standardFile: "teStandard.csv",
    pprFile: "tePPR.csv",
    csvHeaing: [...baseHeading],
  },
  def: {
    length: 1,
    url: process.env.DEF_URL,
    standardFile: "defStandard.csv",
    csvHeaing: [...baseHeading],
  },
};

interface Player {
  name: string;
  position?: string;
  team?: string;
}
interface playerData extends Player {
  rank: number;
  thirdOption?: string;
}

interface ParsePlayerData extends Player {
  rank: number;
  standardRank?: number | string;
  pprRank?: number;
}

interface RowData extends Player {
  rank: string;
  name: string;
}

type PlayerObject = { [key: string]: ParsePlayerData };
export {
  positionConstants,
  playerData,
  ParsePlayerData,
  RowData,
  PlayerObject,
};
