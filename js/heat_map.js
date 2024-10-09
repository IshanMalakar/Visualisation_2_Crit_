// Embed the heat map
vegaEmbed('#heat_map', "json/heat_map.vg.json", { "actions": false }).then(result => {
    // Listen for a change in the dropdown and update the median income display
    document.getElementById("groupDropdown").addEventListener("change", function () {
        var selectedGroup = this.value;
        updateMedianIncomeText(selectedGroup);  // This function will update the median income display
    });
});

// Function to update the median income display based on the selected group
function updateMedianIncomeText(group) {
    fetch('data/Education_Income.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header
            for (let row of rows) {
                const cols = row.split(',');
                const groupName = cols[0];
                const medianIncome = cols[5]; // Assuming 6th column is Median Income (Weekly)
                if (groupName === group) {
                    document.getElementById('median_income_chart').innerHTML =
                        `<h3>Median Weekly Income: $${medianIncome}</h3>`;
                    break;
                }
            }
        })
        .catch(err => console.error('Error loading CSV:', err));
}
