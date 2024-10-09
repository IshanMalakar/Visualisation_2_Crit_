// Embed the scatter plot
vegaEmbed('#scatter_plot', "json/scatter_plot2.vg.json", { "actions": false }).then(result => {
    const view = result.view;
    
    // Add click interaction to capture selected state (region)
    view.addEventListener('click', function(event, item) {
        if (item.datum) {
            const selectedRegion = item.datum.Region;  // Capture selected region (state)
            updatePieChart(selectedRegion);  // Call the function to update the pie chart
        }
    });
});

// Function to update the pie chart based on selected region
function updatePieChart(region) {
    // Embed the pie chart and pass the selected region as a parameter
    vegaEmbed('#pie_chart', {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Donut chart of employment size by industry for the selected state.",
        "title": {
            "text": "Employment Size by Industry for " + region,
            "fontSize": 16,
            "offset": 30  // Add offset to increase space between title and chart
        },
        "height": 400,
        "width":600,    
        "background":"#cbcbcb",  // Match the background color of the page
        "data": {
            "url": "../data/Bubble_chart_.csv",
            "format": {"type": "csv"}
        },
        "transform": [
            {
                "filter": "datum['Region'] == '" + region + "'"
            }
        ],
        "mark": {
            "type": "arc",
            "innerRadius": 295  // Adjusted to create a donut chart effect
        },
        "encoding": {
            "theta": {
                "field": "Employment_size",
                "type": "quantitative",
                "title": "Employment Size"
            },
            "color": {
                "field": "Industry",
                "type": "nominal",
                "title": "Industry",
                "legend": {
                    "orient": "right",  // Move the legend to the right
                    "offset": 60
                
                },
                "scale" :{
                    "range": [
                    "#1f78b4",  
                        "#33a02c", 
                        "#a6cee3",  
                        "#b2df8a",  
                        "#fb9a99",  
                        "#fdbf6f",  
                        "#cab2d6",  
                        "#ffff99"]
                }
            },
            "tooltip": [
                { "field": "Industry", "type": "nominal", "title": "Industry" },
                { "field": "Employment_size", "type": "quantitative", "title": "Employment Size" }
            ]
        },
        "config": {
            "legend": { "titleFontSize": 12, "labelFontSize": 10 },
            "axis": {
                "labelFontSize": 12,
                "titleFontSize": 14
            }
        }
    }, { "actions": false });
}
