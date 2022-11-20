function createPie(width, height) {
  var pie = d3.select("#pie")
                  .attr("width", width)
                  .attr("height", height);

  pie.append("g")
      .attr("transform", "translate(" + width / 2 + ", " + (height / 2 + 10) + ")")
      .classed("chart", true);

  pie.append("text")
      .attr("x", width / 2)
      .attr("y", "1em")
      .attr("font-size", "1.5em")
      .style("text-anchor", "middle")
      .classed("pie-title", true);
}

function drawPie(data, currentYear) {
  var pie = d3.select("#pie");

  var arcs = d3.pie()
               .sort((a,b) => {
                 if (a.continent < b.continent) return -1;
                 if (a.continent > b.continent) return 1;
                 return a.emissions - b.emissions;
               })
               .value(d => d.emissions);

  var path = d3.arc()
               .outerRadius(+pie.attr("height") / 2 - 50)
               .innerRadius(20);

  var yearData = data.filter(d => d.year === currentYear);
  
  var continents = [];
  for (var i = 0; i < yearData.length; i++) {
    var continent = yearData[i].continent;
    if (!continents.includes(continent)) {
      continents.push(continent);
    }
  }

  var colorScale = d3.scaleOrdinal()
                     .domain(continents)
                     .range(["#F4C300", "#0085C7", "#000000", "#DF0024", "#009F3D"]);

  var update = pie
                 .select(".chart")
                 .selectAll(".arc")
                 .data(arcs(yearData));

  update
    .exit()
    .remove();

  update
    .enter()
      .append("path")
      .classed("arc", true)
      .attr("stroke", "#dff1ff")
      .attr("stroke-width", "0.25px")
    .merge(update)
      .attr("fill", d => colorScale(d.data.continent))
      .attr("d", path);

  pie.select(".pie-title")
      .text("Total Global Emissions grouped by continent and region, " + currentYear);
}











