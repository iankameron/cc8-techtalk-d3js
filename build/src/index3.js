const yearList = Object.keys(allPopData);
yearList.sort();
let currentYear = yearList[0];
let popData = allPopData[yearList[0]];
let dataOne = allPopData[yearList[0]];
let dataTwo = allPopData[yearList[18]];
for (datapoint of dataOne) {
  if (cities.indexOf(datapoint[0]) === -1) {
  }
}

let xscale = d3.scaleLinear().domain([139.116,141.103]).range([1,800]); //longitude
let yscale = d3.scaleLinear().domain([36.7555, 38.018]).range([640,1]); //latitude
let rscale = d3.scaleSqrt().domain([0,300000]).range([0,50]);
let cscale = d3.scaleLinear().domain([-2,0,2]).range(["red", "white", "green"]).clamp(true);

let svg = d3.select("#existing");

// red line overlay on timeline to show the year of the disaster
let redlin = svg.append("rect")
  .attr("height", 60)
  .attr("width", 15)
  .attr("y", 645)
  .attr("x", 420)
  .attr("fill", "red")
  .attr("opacity", 0.4);

let label = svg.append("text")
  .attr("class", "year label")
  .attr("y", 700)
  .attr("x", 200)
  .attr("fill", "black")
  .text(currentYear);

const box = label.node().getBBox();

let overlay = svg.append("rect")
  .attr("class", "overlay")
  .attr("x", box.x)
  .attr("y", box.y)
  .attr("width", box.width)
  .attr("height", box.height)
  .on("mouseover", enableInteraction);

render(latLongs, xscale, yscale, rscale, cscale);

function render (latLongs, xScale, yScale, rScale, cScale) {
  let dataPoints = svg
    .selectAll("circle")
    .data(popData)
      .attr("cx", d=>xScale(latLongs[cities.indexOf(d[0])][0])) 
      .attr("cy", d=>yScale(latLongs[cities.indexOf(d[0])][1]))
      .attr("r", d=>rScale(d[1]))
      .attr("id", d=>d[0])
      .attr("class", "outline-two")
      .attr("fill", d=>cScale(d[2]))
      .attr("opacity", 0.7)
      .attr("stroke", "black")
      .attr("stroke-width", "1px");
      
  dataPoints.exit().remove();
  
  dataPoints = dataPoints.enter().append("circle")
      .attr("cx", d=>xScale(latLongs[cities.indexOf(d[0])][0])) 
      .attr("cy", d=>yScale(latLongs[cities.indexOf(d[0])][1]))
      .attr("r", d=>rScale(d[1]))
      .attr("id", d=>d[0])
      .attr("class", "outline-two")
      .attr("fill", d=>cScale(d[2]))
      .attr("opacity", 0.7)
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
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
    if (yearList[newYear] !== currentYear) {
      currentYear = yearList[newYear];
      label.text(currentYear);
      popData = allPopData[currentYear];
      render(latLongs, xscale, yscale, rscale, cscale);
    }
  }
}

