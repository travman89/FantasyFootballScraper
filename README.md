To install dependencies run `yarn`

Create a .env file with corresponding URLS as matching variables in `constants.ts`

To generate csv files for a position run `ts-node src/index.ts <position>` ex `ts-node src/index.ts all`

To parse generated files into JSON run `ts-node src/parseCSV.ts <position>`

Crawler code found in `index.ts`
Parsing code found in `parseCSV.ts`
