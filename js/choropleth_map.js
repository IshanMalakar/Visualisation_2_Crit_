function initializeChoroplethMap() {
  const mapSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Choropleth map of unemployment rate by region",
    width: 800,
    height: 600,
    data: {
      url: "json/SA4_2021_AUST_GDA94.json",
      format: { type: "topojson", feature: "VictoriaMap" }
    },
    projection: { type: "mercator" },
    transform: [
      {
        lookup: "properties.SA4_NAME21",
        from: {
          data: { url: "./data/MelbUnemployData.csv", format: { type: "csv" } },
          key: "Region",
          fields: ["UnemploymentRate"]
        }
      }
    ],
    mark: { type: "geoshape", stroke: "white", strokeWidth: 1 },
    encoding: {
      color: {
        field: "UnemploymentRate",
        type: "quantitative",
        scale: { scheme: "reds" },
        legend: { title: "Unemployment Rate (%)" }
      },
      tooltip: [
        { field: "properties.SA4_NAME21", type: "nominal", title: "Region" },
        { field: "UnemploymentRate", type: "quantitative", title: "Unemployment Rate (%)" }
      ]
    }
  };

  // Embed the choropleth map
  vegaEmbed('#choropleth_map', mapSpec).then(result => {
    // Add click event listener to update bar chart when a region is clicked
    result.view.addEventListener('click', (event, item) => {
      if (item && item.datum && item.datum.properties) {
        const selectedRegion = item.datum.properties.SA4_NAME21.trim();
        console.log("Region clicked: ", selectedRegion);  // Log clicked region
        updateBarChart(selectedRegion);  // Pass to updateBarChart
      }
    });
  }).catch(console.error);
}

initializeChoroplethMap();
