# Global-CO2-Emissions-Data Visualization

This repository is to showcase the Global Carbon Dioxide Emissions Data visualization from 1990 to 2019. **Click here to try it out:** [D3 Visualization](https://thomaslui003.github.io/Global-CO2-Emissions-DataVisualization/)

<img src="https://github.com/thomaslui003/Global-CO2-Emissions-DataVisualization/raw/main/co2EmissionVis.png">

###Interaction
User can select a country in the world map to see the country's yearly CO2 emissions trend. And, the range slider in the dashboard can be used to explore a specific year's world CO2 emissions distribution indicated with the light yellow to red colour encoding. Moreover, user can hover over each section of a graph/map to see more detailed informations such as country, year, population, percentage ratio to world total, and emissions about the hovered/selected country.  

## Description
  ### Data Mapping

<img src="https://github.com/thomaslui003/Global-CO2-Emissions-DataVisualization/raw/main/dataMapping.jpg" width="807" height="524">

The data mapping of my digital data visualization consists of three main aspects: the choropleth map color range co2 emission encoding, the pie graph color encoding, and the height of the bar graph encoding. For my choropleth map, the co2 emission data uses the range from light yellow to red to indicate the severity of the emission for a given year. Thus, the range is bounded according to the min and max co2 emission values of any country for the year. And, the range of co2 values is categorized with the four colors with D3 libraries sorting and grouping the values for color encoding for the map. Next, the pie graph has five different color encodings for each region/ continent in the world, specifically, red for America, yellow for Asia, blue for Europe, black for Africa, and green for Oceania regions. Also, the arc width of each of the small sections within the pie graph indicates each individual country’s co2 emission ratio in comparison to the rest of the world. Finally, the height of the purple bar indicates the amount of co2 emission (kt)
or (emission per capita) a country emitted for a given year.


### Executing the program

1. Clone the repository on Github
2. Open VsCode with the repository file folder
3. The application can be compiled and run using VScode extension "Live Preview" for viewing and interaction on localhost
4. Alternative option is to use the github hosted link above to view and interact with the data visualization


### Source

Dataset link: https://databank.worldbank.org/reports.aspx?source=2&series=EN.ATM.CO2E.PC&country=#

The dataset is available on the website The World Data Bank and is relatively detailed as it covers most countries in the world and a long period of CO2 emission data with other attributes like country populations. (approx 6300+ rows of data)
