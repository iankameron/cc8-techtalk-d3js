let d = [];

d3.csv("../data/iris_csv.csv", (row) => {
  row.sepallength = parseFloat(row.sepallength);
  row.sepalwidth = parseFloat(row.sepalwidth);
  row.petallength = parseFloat(row.petallength);
  row.petalwidth = parseFloat(row.petalwidth);
  d.push(row);
})
.then(()=>{
  console.log(d);
  let slscale = d3.scaleLinear().domain([4,7]).range([1,200]);
  let swscale = d3.scaleLinear().domain([2.5,4]).range([200,1]);
  let pwscale = d3.scaleLinear().domain([0,2]).range([0,10]);
  let typescale = d3.scaleOrdinal().range(d3.schemeSet1);
  let newSvg = d3.select("#insertion").append("svg").attr("width", 500).attr("height", 500);
  let dataPoints = newSvg.selectAll("circle").data(d);
  render(dataPoints, slscale, swscale, pwscale, typescale);
});

let scale = d3.scaleLinear().domain([-1,1]).range(["purple", "red"]);

document.getElementById("id1").setAttribute("style", `background-color: ${scale(-0.75)}`);
document.getElementById("id2").setAttribute("style", `background-color: ${scale(-0.25)}`);
document.getElementById("id3").setAttribute("style", `background-color: ${scale(-0.1)}`);
document.getElementById("id4").setAttribute("style", `background-color: ${scale(0.6)}`);
document.getElementById("id5").setAttribute("style", `background-color: ${scale(0.9)}`);


function render (dataPoints, xScale, yScale, rScale, typescale) {
  dataPoints.enter().append("circle")
    .attr("cx", d=>xScale(d.sepallength))  //d=>myScale(d))
    .attr("cy", d=>yScale(d.sepalwidth))  //d=>{return myScale(d);})  
    .attr("r", d=>rScale(d.petalwidth))
    .attr("class", "outline")
    .attr("stroke", d=>typescale(d.class));
    
  dataPoints
    .attr("cx", d=>xScale(d.sepallength))  //d=>myScale(d))
    .attr("cy", d=>yScale(d.sepalwidth))  //d=>{return myScale(d);})  
    .attr("r", d=>rScale(d.petalwidth));

  dataPoints.exit().remove();
}
// render(d);