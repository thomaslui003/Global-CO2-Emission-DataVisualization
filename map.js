
function createMap(geoData,width, height) {

  //selecting the <svg> layer
  const svg = d3.select("#map")
        .attr("width", width)
        .attr("height", height);
  
  
  //under <svg>, created <g class=map-group>
  svg.append("g")
    .attr("class", "map-group");


    const defs = svg.append("defs");
  
    // Define the shadow filter for reset zoom button
    const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "shadow");
  
    filter.append("feOffset")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "shadow");
  
    filter.append("feComponentTransfer")
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.3);
  
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");
  
    // Create button background with shadow
    // Created a button group to link the functionality of both the text button and the rect background button
    const buttonGroup = svg.append("g")
      .attr("class", "reset-zoom-group");

    //zoom Icon animation initialization
    const zoomIcon = svg.append("g")
    .attr("class", "zoom-icon")
    .attr("transform", `translate(${width / 2 - 40}, ${height / 2 - 40})`);
  
    zoomIcon.append("circle")
      .attr("r", 15)
      .attr("fill", "none")
      .attr("stroke", "#454444")
      .attr("stroke-width", 2);
  
    zoomIcon.append("line")
      .attr("x1", 12)
      .attr("y1", 12)
      .attr("x2", 22)
      .attr("y2", 22)
      .attr("stroke", "#454444")
      .attr("stroke-width", 2);
  
    // Animate the magnifying glass
    function animateZoomIcon() {
      zoomIcon.transition()
        .duration(1000)
        .attr("transform", `translate(${width / 2 - 40}, ${height / 2 - 40}) scale(1.5)`)
        .transition()
        .duration(1000)
        .attr("transform", `translate(${width / 2 - 40}, ${height / 2 - 40}) scale(1)`)
        .transition()
        .duration(500)
        .style("opacity", 0)
        .remove();
    }
  

    // Add floating hint text
    const hintText = svg.append("text")
      .attr("class", "zoom-hint")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#454444")
      .style("font-size", "16px")
      .style("opacity", 0)
      .text("Scroll to Zoom");

    // Animate hint text with floating effect
    hintText.transition()
      .duration(1000)
      .style("opacity", 0.9)
      .transition()
      .duration(1000)
      .attr("y", height / 2 - 10)
      .transition()
      .duration(1000)
      .attr("y", height / 2)
      .style("opacity", 0)
      .remove();

    // Sequence the animations
    animateZoomIcon();

    //the rectangle button 
    const resetButton = buttonGroup.append("rect")
      .attr("id", "reset-zoom-button-bg")
      .attr("x", 4)
      .attr("y", 4)
      .attr("width", 80)
      .attr("height", 30)
      .attr("fill", "#f0f0f0")
      .attr("stroke", "#ccc")
      .attr("rx", 11)
      .attr("ry", 11)
      .attr("filter", "url(#drop-shadow)")
      .style("cursor", "pointer")
      .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#e0e0e0");  // Lighter gray on hover
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("fill", "#f0f0f0");  // Return to original color
      })
      .on("click", function() {
        // This will be populated in the drawMap function
      });


        // Add initial pulse animation to the button
    function pulseButton() {
      resetButton
        .transition()
        .duration(800)
        .attr("stroke", "#4CAF50")
        .attr("stroke-width", "4")
        .transition()
        .duration(800)
        .attr("stroke", "#ccc")
        .attr("stroke-width", "1");
    }

    // Pulse the button 3 times
    pulseButton();
    setTimeout(pulseButton, 1700);
    setTimeout(pulseButton, 3400);

    buttonGroup.append("text")
    .attr("id", "reset-zoom-button")
    .attr("x", 44) 
    .attr("y", 22)  
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("cursor", "pointer")
    .text("Reset Zoom")
    // .style("text-decoration", "underline")
    .on("mouseover", function() {
      d3.select("#reset-zoom-button-bg")
        .attr("fill", "#e0e0e0");  // Lighter gray on hover
    })
    .on("mouseout", function() {
      d3.select("#reset-zoom-button-bg")
        .attr("fill", "#f0f0f0");  // Return to original color
    })
    .on("click", function() {
      // This will be populated in the drawMap function
    });

  
  // Create a group for the title and its background
  const svgTitle = svg.append("g")
    .attr("class", "title-group");

  // Add white background rectangle for the title
  svgTitle.append("rect")
    .attr("class", "title-background")
    .attr("x", width / 2)
    .attr("y", "0.7em")
    .attr("width", 340)  // You can adjust this width as needed
    .attr("height", "2em")
    .attr("fill", "white")
    .attr("opacity", 0.9)
    .attr("transform", "translate(-170, 0)")  // Center the rectangle by shifting it left by half its width
    .attr("rx", 9)  // Rounded corners
    .attr("ry", 9);  // Rounded corners

  // Add the title text
  svgTitle.append("text")
    .attr("x", width / 2)
    .attr("y", "1.5em")
    .attr("font-size", "1.5em")
    .style("text-anchor", "middle")
    .classed("map-title", true);


  // Add responsive behavior for the svg#map
  responsivefy(svg);


}


function drawMap(geoData, climateData, year, dataType) {

  var map = d3.select("#map");
  var mapGroup = map.select(".map-group");
  var width = +map.attr("width");
  var height = +map.attr("height");

  mapGroup.selectAll("*").remove();
  
  //ensure the scaling for the original map is centered 
  // used the width divided by a modifiable number to get a better scaling for the map
  var projection = d3.geoMercator()
    .scale(width/7.3) 
    .translate([
      width / 2,
      height / 1.5
    ]);

  //define map path
  var path = d3.geoPath()
    .projection(projection);

  d3.select("#year-val").text(year);

  //match geodata with climate data, ensure have country name, find data for specific 
  // d is each of the detailed points
  geoData.forEach(d => {
    var countries = climateData.filter(row => row.countryCode === d.id);
    var name = '';
    if (countries.length > 0) name = countries[0].country;
    d.properties = countries.find(c => c.year === year) || { country: name };
  });

  var colours = ["#f1c40f", "#e67e22", "#e74c3c", "#c0392b"]; //the colour range for map (yellow to red for indication of severity)

  var domains = {
    emissions: [0, 2.5e5, 1e6, 5e6],
    emissionsPerCapita: [0, 0.5, 2, 10]
  };

  var mapColorScale = d3.scaleLinear()
    .domain(domains[dataType])
    .range(colours);

  const currentTransform = d3.zoomTransform(map.node()) || d3.zoomIdentity;

  

  //need to separate this update var with the update click event below to enable other interaction 
  var update = mapGroup.selectAll(".country")
    .data(geoData)
    .enter()
    .append("path")
    .classed("country", true)
    .attr("d", path)
    //current transform keeps the existing zoom level
    .attr("transform", currentTransform);


  update
    .on("click", function () {
      var currentDataType = d3.select("input:checked")
        .property("value");
      var country = d3.select(this);
      var isActive = country.classed("active");
      var countryName = isActive ? "" : country.data()[0].properties.country;
      drawBar(climateData, currentDataType, countryName);
      highlightBars(+d3.select("#year").property("value"));
      d3.selectAll(".country").classed("active", false);
      country.classed("active", !isActive);
    })
    .merge(update)
    .transition()
    .duration(750)
    .attr("fill", d => {
      var val = d.properties[dataType];
      return val ? mapColorScale(val) : "#ccc";
    })

    
  d3.select(".map-title")
    .text("CO2 " + graphTitle(dataType) + " in " + year);


  const zoom = d3.zoom()
    .scaleExtent([1,16])
    .translateExtent([[0,0],[width, height]])
    .on("zoom", zoomed);


    map.call(zoom)
      .call(zoom.transform, currentTransform);;

  

  function zoomed(){
    update.attr("transform", d3.event.transform)  
  }

  d3.select(".reset-zoom-group")
    .on("click", function() {
      map.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    });


  
}


function graphTitle(str) {
  return str.replace(/[A-Z]/g, c => " " + c.toLowerCase());
}




//function for resizing the map when window size changes
function responsivefy(svg) {
  // Get the container and calculate the aspect ratio

  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  // const chartsContainer = d3.select('.charts-container');

  // Set up the viewBox and preserveAspectRatio attributes
  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  // Add resize event listener
  d3.select(window).on("resize." + container.attr("id"), resize);

  function resize() {
      var targetWidth = parseInt(container.style("width"));
      var containerHeight = parseInt(container.style("height"));
      
      // Ensure height adapts properly, maintaining aspect ratio or matching container
      var targetHeight = containerHeight|| Math.round(containerWidth / aspect);

      svg.attr("width", targetWidth);
      svg.attr("height", targetHeight);
  }
}

