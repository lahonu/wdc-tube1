(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "name",
			alias: "Name",
            dataType: tableau.dataTypeEnum.string
		}, {
            id: "zone",
            alias: "Zone",
            dataType: tableau.dataTypeEnum.string
		}, {
            id: "latitude",
            alias: "Lat",
            dataType: tableau.dataTypeEnum.float
		}, {
            id: "longitude",
            alias: "Lon",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://marquisdegeek.com/api/tube/", function(resp) {
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "name": resp[i].name,
					"zone": resp[i].zone,
					"latitude": resp[i].latitude,
					"longitude": resp[i].longitude,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
