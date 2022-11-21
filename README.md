# Global-CO2-Emissions-Data Visualization

This repository is to showcase the Global Carbon Dioxide Emissions Data visualization from 1990 to 2019. **Click here to try it out:** [D3 Visualization](https://thomaslui003.github.io/Global-CO2-Emissions-DataVisualization/)

<img src="https://github.com/thomaslui003/Global-CO2-Emissions-DataVisualization/raw/main/co2EmissionVis.png">

## Description
  ### Data Mapping

<img src="https://github.com/thomaslui003/Global-CO2-Emissions-DataVisualization/raw/main/dataMapping.jpg" width="807" height="524">

The data mapping of my digital data visualization consists of three main aspects: the choropleth map color range co2 emission encoding, the pie graph color encoding, and the height of the bar graph encoding. For my choropleth map, the co2 emission data uses the range from light yellow to red to indicate the severity of the emission for a given year. Thus, the range is bounded according to the min and max co2 emission values of any country for the year. And, the range of co2 values is categorized with the four colors with D3 libraries sorting and grouping the values for color encoding for the map. Next, the pie graph has five different color encodings for each region/ continent in the world, specifically, red for America, yellow for Asia, blue for Europe, black for Africa, and green for Oceania regions. Also, the width of each of the small sections within the pie graph indicates each individual country’s co2 emission ratio in comparison to the rest of the world. Finally, the height of the purple bar indicates the amount of co2 emission (kt)
or (emission per capita) a country emitted for a given year.


### Executing the program

1. Clone the repository on Github
2. Open VsCode with the repository file folder
3. The application can be compiled and run using VScode extension "Live Preview" for viewing and interaction on localhost
4. Alternative option is to use the github hosted link above to view and interact with the data visualization



