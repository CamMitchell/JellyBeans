$(document).ready(function() {
	$("#btnCalculate").click(function() {
        CalculateTotal();
    });

    $("#JarType").on("change", function() {
        if ($("#JarType").val() == -1) {
            $("#CustomJar").removeClass("d-none");
        }
        else {
            $("#CustomJar").addClass("d-none");
        }
    });

    $("#PercentFull").on("change", function() {
        $("#PercentFullLabel").html(this.value + " %");
    });

    CalculateTotal();

});

// Name: isNumeric
// Descrition:
// Helper function that accpets a sting value and checks if it is a number. Return true if it is a Number and false if it is not
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function CalculateTotal() {
    $("#errorMessage").html("");
    $("#Total").html("");

    // Constansts
    let pi = Math.PI;
    let centimeterToInch = 2.54;

    let jars = [
        {
            "name": "Ball 4 oz Mason Jar  ",
            "height": 5.2,
            "diameter": 3.2,
            "glassWidth": 0.035,
            "volume": 7.21875
        },
        {
            "name": "Ball 8 oz Mason Jar  ",
            "height": 5.2,
            "diameter": 3.2,
            "glassWidth": 0.035,
            "volume": 14.4375
        },
        {
            "name": "Ball 16 oz Mason Jar  ",
            "height": 5.2,
            "diameter": 3.2,
            "glassWidth": 0.035,
            "volume": 28.875
        },                        
        {
            "name": "Ball 32 oz Mason Jar",
            "height": 6.9,
            "diameter": 3.9,
            "glassWidth": 0.035,
            "volume": 57.75
        },
        {
            "name": "Ball 64 oz Mason Jar",
            "height": 6.9,
            "diameter": 3.9,
            "glassWidth": 0.035,
            "volume": 115.5
        },        
        {
            "name": "Ball 128 oz Jar",
            "height": 10.5,
            "diameter": 5.7,
            "glassWidth": 0.035,
            "volume": 231
        }
      ];

      let candies = [
        {
            "name": "Jelly Bean",
            "volume": 0.0654498691,
            "packingFactor": 0.78125
        },
        {
            "name": "M&M",
            "volume": 0.038811101,
            "packingFactor": 0.62
        },
        {
            "name": "Peanut M&M",
            "volume": 0.0511195904,
            "packingFactor": 0.77
        },
        {
            "name": "1.20\" Gum Ball",
            "volume": 7.23823,
            "packingFactor": 0.74
        },
        {
            "name": "1.13\" Gum Ball",
            "volume": 6.04399,
            "packingFactor": 0.74
        },
        {
            "name": "1\" Gum Ball",
            "volume": 4.18879,
            "packingFactor": 0.74
        },
        {
            "name": " 0.94\" Gum Ball",
            "volume": 3.47914,
            "packingFactor": 0.74
        },
        {
            "name": "0.925\" Gum Ball",
            "volume": 3.31523,
            "packingFactor": 0.74
        },
        {
            "name": "0.86\" Gum Ball",
            "volume": 2.66431,
            "packingFactor": 0.74
        },
        {
            "name": "0.76\" Gum Ball",
            "volume": 1.83878,
            "packingFactor": 0.74
        },
        {
            "name": "0.62\" Gum Ball",
            "volume": 0.99831,
            "packingFactor": 0.74
        },
        {
            "name": "0.56\" Gum Ball",
            "volume": 0.73562,
            "packingFactor": 0.74
        },
        {
            "name": "0.5\" Gum Ball",
            "volume": 0.5236,
            "packingFactor": 0.74
        }      
      ];

    // Get interface values  
    let jarType = $("#JarType").val();
    let candyType = $("#CandyType").val();
    let percentFull = $("#PercentFull").val() / 100;

    // Custom values provided
    if (jarType == -1) {
        // Get custom values from interface
        height = $("#Height").val();
        diameter = $("#Diameter").val();
        glassWidth = 0.035;
        heightUOM = $("#HeightUoM").val();
        diameterUOM = $("#DiameterUoM").val();

        // Validation of Custom parameters
        let errorMessage = "";
        
        // Can't be empty
        if (height == "" || diameter == "") {
            errorMessage = "Height and diameter must be provided";
        }
        // Must be numeric
        else if (!isNumeric(height) || !isNumeric(diameter)) {
            errorMessage = "Height and diameter must be numeric";
        }

        // Display error message
        if (errorMessage != "") {
            $("#errorMessage").html(errorMessage);
            return;
        }

        console.log(heightUOM);
        // Conversion to inches
        if (heightUOM != "in") {
            height = height / centimeterToInch;
        }
        if (diameterUOM != "in") {
            diameter = diameter / centimeterToInch;
        }

        // Calculations
        height = height - glassWidth;
        console.log("Height:" + height);

        let raidus = (diameter / 2) - glassWidth;
        console.log("Raidus: " + raidus);

        totalJarVolume = pi*(raidus*raidus)*height;
        console.log("Total Jar Volume: " + totalJarVolume);

    }
    else {
        // Get parameters from perset values
        height = jars[jarType].height;
        diameter = jars[jarType].diameter;
        glassWidth = jars[jarType].glassWidth;
        totalJarVolume = jars[jarType].volume; 
    }

    // Candy 
    let candyVolume = candies[candyType].volume;
    let candyPackingFactor = candies[candyType].packingFactor;

    let usableJarVolume = totalJarVolume * candyPackingFactor;
    console.log("Usable Jar Volume: " + usableJarVolume);

    let totalCandies = (usableJarVolume / candyVolume) * percentFull;
    console.log("Total candies: " + totalCandies);

    // Display total
    $("#Total").html(Math.floor(totalCandies));
}