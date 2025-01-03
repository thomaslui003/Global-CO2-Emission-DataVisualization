
function createPie(width, height) {
  var pie = d3.select("#pie")
                  .attr("width", width)
                  .attr("height", height);

  pie.append("g")
      .classed("chart", true);
      
  pie.append("g")
      .classed("legend", true);

  pie.append("text")
      .classed("pie-title", true);
  
  // Store the current data and dimensions
  pie.node().__currentData = [];
  pie.node().__currentYear = null;
  
  responsivefyPie(pie);
}

function drawPie(data, currentYear) {
  var pie = d3.select("#pie");
  
  // Store current data and year
  pie.node().__currentData = data;
  pie.node().__currentYear = currentYear;
  
  updatePieChart(pie.node());
}

function updatePieChart(svgNode) {
  const pie = d3.select(svgNode);
  const data = svgNode.__currentData;
  const currentYear = svgNode.__currentYear;
  
  // Get current dimensions
  const width = +pie.attr("width");
  const height = +pie.attr("height");
  
  // Calculate margins based on container size
  const margin = {
    top: Math.max(20, height * 0.08),
    right: Math.max(20, width * 0.08),
    bottom: Math.max(20, height * 0.08),
    left: Math.max(20, width * 0.08)
  };

  // Calculate radius - using the full available space
  const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) * 0.37;

  // Center the chart
  pie.select(".chart")
     .attr("transform", `translate(${width / 2}, ${(height / 2) - margin.top * 0.3})`);

  // Update legend position
  const legendX = width - margin.right - (width * 0.22);
  pie.select(".legend")
     .attr("transform", `translate(${legendX}, ${height * 0.2})`);

  const yearData = data.filter(d => d.year === currentYear);
  
  // Get unique continents
  const continents = [...new Set(yearData.map(d => d.continent))];

  const colorScale = d3.scaleOrdinal()
    .domain(continents)
    .range(["#F6C85F", "#4198D7", "#000000", "#E55759", "#009F3D"]);

  const arcGenerator = d3.pie()
    .sort((a, b) => {
      if (a.continent < b.continent) return -1;
      if (a.continent > b.continent) return 1;
      return a.emissions - b.emissions;
    })
    .value(d => d.emissions);

  const path = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius * 0.4);

  // Update arcs
  const update = pie.select(".chart")
    .selectAll(".arc")
    .data(arcGenerator(yearData));

  update.exit().remove();

  update.enter()
    .append("path")
    .classed("arc", true)
    .attr("stroke", "#dff1ff")
    .attr("stroke-width", "0.25px")
    .merge(update)
    .attr("fill", d => colorScale(d.data.continent))
    .attr("d", path);

  // Update legend
  const legendFontSize = Math.max(11, Math.min(14, width / 65));
  const legendSpacing = legendFontSize * 1.5;
  
  const legend = pie.select(".legend")
    .selectAll(".legend-item")
    .data(colorScale.domain());

  const legendEnter = legend.enter()
    .append("g")
    .classed("legend-item", true);

  legendEnter.append("rect")
    .attr("width", legendFontSize)
    .attr("height", legendFontSize);

  legendEnter.append("text")
    .attr("x", legendFontSize * 1.5)
    .attr("y", legendFontSize * 0.8);

  const legendUpdate = legend.merge(legendEnter)
    .attr("transform", (d, i) => `translate(0, ${i * legendSpacing})`);

  legendUpdate.select("rect")
    .attr("fill", d => colorScale(d));

  legendUpdate.select("text")
    .style("font-size", `${legendFontSize}px`)
    .text(d => d);

  legend.exit().remove();

  // Update title
  const titleFontSize = Math.max(14, Math.min(22, width / 35));
  pie.select(".pie-title")
    .attr("x", width / 2)
    .attr("y", margin.top - 4)
    .attr("font-size", `${titleFontSize}px`)
    .style("text-anchor", "middle")
    .text(`Total Global Emissions grouped by continent and region, ${currentYear}`);
}

function responsivefyPie(svg) {
  const container = d3.select(svg.node().parentNode);
  const chartsContainer = d3.select('.charts-container');

  function resizePie() {
    // Get the full width of the container
    const targetWidth = parseInt(chartsContainer.style("width"));
    const containerHeight = parseInt(chartsContainer.style("height"));
    
    // Use the full container width and maintain aspect ratio
    const targetHeight = containerHeight * 0.45;
    
    // Update SVG dimensions to use full width
    svg.attr("width", targetWidth)
       .attr("height", targetHeight);

    // Only update if we have data
    if (svg.node().__currentData.length > 0) {
      updatePieChart(svg.node());
    }
  }

  // Add debounced resize handler
  let resizeTimeout;
  const debouncedResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizePie, 250);
  };

  // Initial resize
  resizePie();
  
  // Add resize listener
  window.addEventListener('resize', debouncedResize);
  
  // Return remove listener function
  return function() {
    window.removeEventListener('resize', debouncedResize);
    clearTimeout(resizeTimeout);
  };
}