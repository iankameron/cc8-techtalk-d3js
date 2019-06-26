
// Prepping yearList array from data provided
const yearList = Object.keys(allRadData);
yearList.sort();
let currentYear = yearList[0];
let radiation_data = allRadData[currentYear];

// Scaling for Long/Lat to 
const LATMIN = 36.755;
const LATMAX = 38.018;
const LONGMIN = 139.116;
const LONGMAX = 141.103;
const SMUSH = 300/640; // l/ln
const W0 = 800; // original width of image
const H0 = 640; // original height of imaage
const HI = 500;

let xpersp = (lat, long) => {
  return ((long - LONGMIN) + (lat - LATMIN) * SMUSH * 1.25) * W0 / (LONGMAX - LONGMIN) ;
}
let ypersp = (lat) => {
  return H0 - ((lat - LATMIN) * SMUSH * H0 / (LATMAX - LATMIN)) - (H0 - HI);
}
let maxLoc = radiation_data.reduce((a,b) => {
  if (a[3] >= b[3]) {
    return a;
  }
  return b;
}, [0,0,0,0]);

let maxRad = maxLoc[3];
let hscale = d3.scaleLinear().domain([0,maxRad]).range([0,400]);
let cscale = d3.scaleLinear().domain([0, 100, 200, 300]).range(["black", "yellow", "red", "purple"]).clamp(true); //height

// Elements for the interactive timeline
let timelineSvg = d3.select("#interactive");
let label = timelineSvg.append("text")
  .attr("class", "year label")
  .attr("y", 70)
  .attr("x", 400)
  .attr("fill", "black")
  .text(currentYear);

const box = label.node().getBBox();
let overlay = timelineSvg.append("rect")
  .attr("class", "overlay")
  .attr("x", box.x)
  .attr("y", box.y)
  .attr("width", box.width)
  .attr("height", box.height)
  .on("mouseover", enableInteraction);

// Elements and plotting for the actual data
let dataplotSvg = d3.select("#existing");
render(xpersp, ypersp, hscale, cscale);

function render (xScale, yScale, hScale, cScale) {
  let dataPoints = dataplotSvg
    .selectAll("rect")
    .data(radiation_data)
      .attr("width", 3)
      .attr("height", d=>hScale(d[3]))
      .attr("x", d=>xScale(d[1], d[2]) -2)
      .attr("y", d=>yScale(d[1]) - hScale(d[3]))
      .attr("id", d=>(d[1].toString() + d[2].toString()))
      .attr("fill", d=>cScale(d[3]))
      .attr("opacity", .9)
      .attr("class", "radiation-bar");

  dataPoints.exit().remove();
  dataPoints.enter().append("rect")
      .attr("width", 3)
      .attr("height", d=>hScale(d[3]))
      .attr("x", d=>xScale(d[1], d[2]) -2)
      .attr("y", d=>yScale(d[1]) - hScale(d[3]))
      .attr("id", d=>(d[1].toString() + d[2].toString()))
      .attr("fill", d=>cScale(d[3]))
      .attr("opacity", .9)
      .attr("class", "radiation-bar")
    .merge(dataPoints)
      .order();
}

function enableInteraction() {
  let yearScale = d3.scaleLinear()
    .domain([0, yearList.length - 1])
    .range([box.x, box.x + box.width])
    .clamp(true);
  
  overlay
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("mousemove", mousemove)
    .on("touchmove", mousemove);

  function mouseover() {
    label.classed("active", true);
  }

  function mouseout() {
    label.classed("active", false);
  }

  function mousemove() {
    newYear = Math.round(yearScale.invert(d3.mouse(this)[0]));
    if (currentYear !== yearList[newYear]) {
      currentYear = yearList[newYear];
      label.text(currentYear);
      radiation_data = allRadData[currentYear];
      render(xpersp, ypersp, hscale, cscale);
    }
  }
}


