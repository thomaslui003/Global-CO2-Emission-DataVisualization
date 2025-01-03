# Global-CO2-Emissions-Data Visualization

This repository is to showcase the Global Carbon Dioxide Emissions Data visualization from 1990 to 2019. **Click here to try it out:** [D3 Visualization](https://thomaslui003.github.io/Global-CO2-Emissions-DataVisualization/)

<img src="https://github.com/thomaslui003/Global-CO2-Emissions-DataVisualization/raw/main/updated_UI_Dashboard.png">

### Interaction
Users can interact with a world map to explore yearly CO2 emissions trends by country. With the map zooming feature, users can zoom in and out to focus on specific regions. By selecting a country on the map, they can view that country's yearly CO2 emissions trend. Additionally, a range slider in the dashboard allows users to examine the distribution of global CO2 emissions for a specific year, indicated by a color gradient from light yellow to red. Moreover, users can hover over any section of the graph or map to see detailed information, including the country, year, population, percentage ratio to the world total, and emissions for the selected or hovered country.

## Description
  ### Data Mapping

<img src="https://github.com/thomaslui003/Global-CO2-Emissions-DataVisualization/raw/main/dataMapping.jpg" width="807" height="524">

The digital data visualization consists of three main aspects: the choropleth map color range for CO2 emission encoding, the pie chart color encoding, and the bar graph height encoding. For the choropleth map, the CO2 emission data uses a range from light yellow to red to indicate the severity of emissions for a given year, with the range bounded by the minimum and maximum CO2 emission values of any country for that year. The CO2 values are categorized into four colors, sorted, and grouped using D3 libraries for color encoding on the map. The pie chart features five distinct color encodings for each region or continent: red for America, yellow for Asia, blue for Europe, black for Africa, and green for Oceania. Additionally, the arc width of each section within the pie chart represents each individual country’s CO2 emission ratio compared to the rest of the world. Finally, the height of the purple bars in the bar graph indicates the amount of CO2 emissions (in kilotons) or emissions per capita for a given country and year. This setup allows users to interact with the world map to explore yearly CO2 emissions trends by country, utilize the map zooming feature to focus on specific regions, select a country to view its CO2 emissions trend, and use the range slider to examine the global CO2 emissions distribution for a specific year. Hovering over any section of the graph or map provides detailed information, including the country, year, population, percentage ratio to the world total, and emissions for the selected or hovered country.


### Executing the program

1. Clone the repository on Github
2. Open VsCode with the repository file folder
3. The application can be compiled and run using VScode extension "Live Preview" for viewing and interaction on localhost
4. Alternative option is to use the github hosted link above to view and interact with the data visualization


### Source

Dataset link: https://databank.worldbank.org/reports.aspx?source=2&series=EN.ATM.CO2E.PC&country=#

The dataset is available on the website The World Data Bank and is relatively detailed as it covers most countries in the world and a long period of CO2 emission data with other attributes like country populations. (approx 6300+ rows of data)
