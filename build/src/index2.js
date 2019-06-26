let d = [];

d3.dsv("\t", "../data/cities15000.txt", (row, index) => {
  if (row.population > 20000) {
    d.push(row);
  }
})
.then(()=>{
  let xscale = d3.scaleLinear().domain([-180,180]).range([1,1000]);
  let yscale = d3.scaleLinear().domain([-90,90]).range([600,1]); //latitude
  let maxPop = d.reduce((a,b) => {
    return a.population >= b.population ? a.population : b.population;
  }, 0);
  let rscale = d3.scaleSqrt().domain([0,1000000]).range([0,4]);
  let newSvg = d3.select("#insertion").append("svg").attr("width", 1000).attr("height", 600);
  let dataPoints = newSvg.selectAll("circle").data(d);
  render(dataPoints, xscale, yscale, rscale);
});


function render (dataPoints, xScale, yScale, rScale) {
  dataPoints.enter().append("circle")
    .attr("cx", d=>xScale(d.longitude)) 
    .attr("cy", d=>yScale(d.latitude))
    .attr("r", d=>rScale(d.population))
    .attr("class", "outline-world")
    
  dataPoints
    .attr("cx", d=>xScale(d.sepallength))
    .attr("cy", d=>yScale(d.sepalwidth))
    .attr("r", d=>rScale(d.petalwidth));

  dataPoints.exit().remove();
}