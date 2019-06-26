const fs = require("fs");

// set directorty where source files are
const source = "/Users/ian/dev/python/data";

let dataCollector = [];

let files = fs.readdirSync(source);

// Go through file line by line
let count = 0;
for (let file of files) {
  let filecontent = fs.readFileSync(source + "/" + file, "utf-8");
  let fileLines = filecontent.split("\n");
  for (let line of fileLines) {
    let values = line.split(",");
    if(values.length > 2) {

      values[1] = parseFloat(values[1]);
      values[2] = parseFloat(values[2]);
      values[3] = parseFloat(values[3]);
      dataCollector.push(values);
    }
  }
  count ++;
}

// Output collected data to file
fs.writeFileSync("alldata.dat", JSON.stringify(dataCollector));