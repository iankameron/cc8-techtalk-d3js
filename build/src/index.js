
let d = [];
d3.csv("../data/iris_csv.csv", (row) => {
  console.log(row);
  row.sepallength = parseFloat(row.sepallength);
  row.sepalwidth = parseFloat(row.sepalwidth);
  row.petallength = parseFloat(row.petallength);
  row.petalwidth = parseFloat(row.petalwidth);
  d.push(row);
  // dataArray.forEach((datapoint) => {
  //   console.log(datapoint.sepallength + datapoint.sepalwidth);
  // })
}).then(() => {
  console.log(d);
});
