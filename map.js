

function createMap(width, height) {
  d3.select("#map")
      .attr("width", width)
      .attr("height", height)
    .append("text")
      .attr("x", width / 2)
      .attr("y", "1em")
      .attr("font-size", "1.5em")
      .style("text-anchor", "middle")
      .classed("map-title", true);
    
}

function drawMap(geoData, climateData, year, dataType) {
  var map = d3.select("#map");
  

  var projection = d3.geoMercator()
                     .scale(110)
                     .translate([
                       +map.attr("width") / 2,
                       +map.attr("height") / 1.4
                     ]);

  var path = d3.geoPath()
               .projection(projection);

  d3.select("#year-val").text(year);

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

  
  //var map = d3.select("#map");
  // var svg = d3.select("#map").append("svg")
  // var g = svg.append("#map");
  
  // var zoom = d3.zoom()
  //       .scaleExtent([1,8])
  //       .on('zoom',function(){
  //             g.selectAll('path').attr('transform',d3.event.transform);
  //         })
  // svg.call(zoom);



  // var g = map.append("g");
  // //svg = select("m")
  // map.append("map")
  //    .call(d3.zoom().on("zoom",zoomed));
    
  // function zoomed(){
  //   g.attr("transform", d3.event.transform);
  // }


  var update = map.selectAll(".country")
                  .data(geoData);


  update
    .enter()
    .append("path")
      .classed("country", true)
      .attr("d", path)
      .on("click", function() {
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
      });

  d3.select(".map-title")
      .text("CO2 " + graphTitle(dataType) + " in " + year);
}

function graphTitle(str) {
  return str.replace(/[A-Z]/g, c => " " + c.toLowerCase());
}























