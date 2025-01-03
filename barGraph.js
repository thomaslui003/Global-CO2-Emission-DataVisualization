
function createBar(width, height) {
  var bar = d3.select("#bar")
                  .attr("width", width)
                  .attr("height", height);

  // Create groups for chart elements
  bar.append("g").classed("x-axis", true);
  bar.append("g").classed("y-axis", true);
  bar.append("g").classed("bars-container", true);
  
  // Create labels
  bar.append("text").classed("y-axis-label", true);
  bar.append("text").classed("bar-title", true);

  // Store the current data and settings
  bar.node().__currentData = [];
  bar.node().__currentDataType = "";
  bar.node().__currentCountry = "";

  responsivefyBar(bar);
}

function highlightBars(year) {
  d3.select("#bar")
    .selectAll("rect")
    .attr("fill", d => d.year === year ? "#FE9E53" : "#FFCFA9");
}

function drawBar(data, dataType, country) {
  var bar = d3.select("#bar");
  
  // Store current data and settings
  bar.node().__currentData = data;
  bar.node().__currentDataType = dataType;
  bar.node().__currentCountry = country;
  
  updateBarChart(bar.node());
}

function updateBarChart(svgNode) {
  const bar = d3.select(svgNode);
  const data = svgNode.__currentData;
  const dataType = svgNode.__currentDataType;
  const country = svgNode.__currentCountry;

  // Get current dimensions
  const width = +bar.attr("width");
  const height = +bar.attr("height");
  
  // Calculate margins based on container size with more space for larger fonts
  const margin = {
    top: Math.max(58, height * 0.18),    // for larger title
    right: Math.max(43, width * 0.05),
    bottom: Math.max(58, height * 0.18),  // for larger x-axis labels
    left: Math.max(156, width * 0.15)     // for larger y-axis labels
  };

  // Calculate actual chart dimensions
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;


  const baseFontSize = Math.min(width, height) * 0.025;
  const titleFontSize = baseFontSize * 2.6;
  const axisLabelFontSize = baseFontSize * 1.7;
  const tickFontSize = baseFontSize * 0.9;

  // Filter and sort data
  const countryData = data
    .filter(d => d.country === country)
    .sort((a, b) => a.year - b.year);

  // Create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, chartWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(countryData, d => d[dataType])])
    .range([chartHeight, 0]);

  // Calculate bar width
  const barWidth = Math.min(
    (chartWidth / countryData.length) * 0.8, 50);

  // Update axes, chart width mod states the number of intervals for year axis labels
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format(".0f"))
    .ticks(Math.min(countryData.length, Math.floor(chartWidth / 50)));

  const yAxis = d3.axisLeft(yScale)
    .ticks(Math.min(10, Math.floor(chartHeight / 30)));

  // Transform chart elements group
  const chartGroup = bar.select(".bars-container")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Update axes positions with larger fonts
  bar.select(".x-axis")
    .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
    .call(xAxis)
    .selectAll("text")
    .style("font-size", `${Math.min(17, Math.max(13, width / 65))}px`);  // Increased by ~20%

  bar.select(".y-axis")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(yAxis)
    .selectAll("text")
    .style("font-size", `${Math.min(17, Math.max(13, width / 65))}px`);  // Increased by ~20%

  // Update labels
  const axisLabel = dataType === "emissions" ?
    "CO2 emissions, thousand metric tons" :
    "CO2 emissions, metric tons per capita";

  const barTitle = country ?
    "CO2 Emissions, " + country :
    "Click on a country to see annual trends";

  // Update y-axis label with larger font
  bar.select(".y-axis-label")
    .attr("transform", `rotate(-90) translate(${-height/2},${margin.left/4})`)
    .attr("dy", "2em")
    .style("text-anchor", "middle")
    // .style("font-size", `${Math.min(19, Math.max(14, width / 65))}px`)  
    .style("font-size", `${axisLabelFontSize}px`)
    .text(axisLabel);

  // Update title with larger font
  bar.select(".bar-title")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .style("text-anchor", "middle")
    // .style("font-size", `${Math.min(26, Math.max(19, width / 45))}px`)  
    .style("font-size", `${titleFontSize}px`)
    .text(barTitle);

  // Update bars
  const t = d3.transition()
    .duration(900)
    .ease(d3.easeBounceIn);

  const update = chartGroup
    .selectAll(".bar")
    .data(countryData);

  // Remove old bars
  update.exit()
    .transition(t)
    .attr("y", chartHeight)
    .attr("height", 0)
    .remove();

  // Add new bars and update existing ones
  update.enter()
    .append("rect")
    .classed("bar", true)
    .attr("y", chartHeight)
    .attr("height", 0)
    .merge(update)
    .attr("x", d => xScale(d.year) - barWidth / 2)
    .attr("width", barWidth)
    .transition(t)
    .attr("y", d => yScale(d[dataType]))
    .attr("height", d => chartHeight - yScale(d[dataType]));
}

function responsivefyBar(svg) {
  const container = d3.select(svg.node().parentNode);
  const chartsContainer = d3.select('.charts-container');
  

  function resizeBar() {
    // Get new dimensions
    const targetWidth = parseInt(chartsContainer.style("width"));
    const containerHeight = parseInt(chartsContainer.style("height"));
    const targetHeight = containerHeight * 0.47;

    // Update SVG dimensions
    svg.attr("width", targetWidth)
       .attr("height", targetHeight);

    // Redraw chart with new dimensions
    if (svg.node().__currentData.length > 0) {
      updateBarChart(svg.node());
    }
  }

  // Add debounced resize handler
  let resizeTimeout;
  const debouncedResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeBar, 250);
  };

  // Initial resize
  resizeBar();
  
  // Add resize listener
  window.addEventListener('resize', debouncedResize);
  
  // Return remove listener function
  return function() {
    window.removeEventListener('resize', debouncedResize);
    clearTimeout(resizeTimeout);
  };
}

