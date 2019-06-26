let allRadiation = require("../data/radiation_data_all");
const fs = require("fs");

radiationCollector = {}

for (let data of allRadiation) {
  let dataYear = data[0].substring(0,4);
  if (radiationCollector[dataYear] === undefined) {
    radiationCollector[dataYear] = [];
  }
  radiationCollector[dataYear].push(data.map(a=>a));
}

for (let data in radiationCollector) {
  radiationCollector[data].sort((a,b) => {
    if (a[1]>b[1]) {return -1}
    return 1;
  });
}

fs.writeFileSync(
  "./build/data/radiation_data.js", 
  "let allRadData = " + 
    JSON.stringify(radiationCollector)) +
    ";";