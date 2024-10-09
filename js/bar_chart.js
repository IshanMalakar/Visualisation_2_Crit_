// Function to update the bar chart with a selected region
function initializeEmploymentBarChart() {
  const fullBarChartSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Full bar chart showing Employment by Occupation across all regions",
    data: {
      url: "./data/Employment_industry_Stacked_bar.csv",
      format: { type: "csv" }
    },
    transform: [
      {
        fold: [
          "Professionals", 
          "Technician/Trades", 
          "Managers", 
          "Clerical/Administrative", 
          "Community and Personal Service", 
          "Sales workers", 
          "Labourers", 
          "Machinery operators and drivers"
        ],
        as: ["Occupation", "value"]
      }
    ],
    mark: "bar",
    encoding: {
      x: { field: "Region", type: "nominal", axis: { title: "Region", labelAngle: -45 } },
      y: { aggregate: "sum", field: "value", type: "quantitative", axis: { title: "Number of Employees" } },
      color: { field: "Occupation", type: "nominal", scale: { scheme: "category10" }, legend: { title: "Occupation" } },
      tooltip: [
        { field: "Region", type: "nominal", title: "Region" }, 
        { field: "Occupation", type: "nominal" }, 
        { field: "value", type: "quantitative", title: "Number of Employees" }
      ]
    }
  };

  // Embed the full bar chart initially
  vegaEmbed('#bar_chart', fullBarChartSpec).then(result => {
    console.log("Full bar chart loaded successfully.");
  }).catch(error => {
    console.error("Error rendering full bar chart:", error);
  });
}

function updateBarChart(selectedRegion) {
  console.log("Attempting to update bar chart for region: ", selectedRegion);

  const filteredBarChartSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: `Filtered bar chart for Employment by Occupation in ${selectedRegion}`,
    data: {
      url: "./data/Employment_industry_Stacked_bar.csv",
      format: { type: "csv" }
    },
    transform: [
      { 
        filter: `lower(trim(datum.Region)) == lower(trim('${selectedRegion}'))`  // Using trim and lower to ensure clean matching
      },
      {
        fold: [
          "Professionals", 
          "Technician/Trades", 
          "Managers", 
          "Clerical/Administrative", 
          "Community and Personal Service", 
          "Sales workers", 
          "Labourers", 
          "Machinery operators and drivers"
        ],
        as: ["Occupation", "value"]
      }
    ],
    mark: "bar",
    encoding: {
      x: { field: "Occupation", type: "nominal", axis: { title: "Occupation", labelAngle: -45 } },
      y: { aggregate: "sum", field: "value", type: "quantitative", axis: { title: "Employment" } },
      color: { field: "Occupation", type: "nominal", scale: { scheme: "category10" }, legend: { title: "Occupation" } },
      tooltip: [
        { field: "Occupation", type: "nominal" }, 
        { field: "value", type: "quantitative", title: "Employment" }
      ]
    }
  };

  // Embed the filtered bar chart
  vegaEmbed('#bar_chart', filteredBarChartSpec).then(result => {
    console.log("Bar chart rendered successfully for region: ", selectedRegion);
    console.log("Filtered data: ", result.view.data("source_0"));  // Log the filtered data
  }).catch(error => {
    console.error("Error rendering bar chart for region:", error);  // Log errors if the rendering fails
  });
}
