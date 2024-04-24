let intervalId;

// Function to simulate data from the data glove
function generateRandomData() {
    return Math.random(); // Replace this with actual data from the data glove
}

// Function to update the display with data from the data glove
function updateDisplay() {
    var display = document.getElementById("display");
    var data = generateRandomData(); // Get data from the data glove
    display.textContent = "Data from data glove: " + data;
}

// Event listener for the start button
document.getElementById("startButton").addEventListener("click", function() {
    intervalId = setInterval(updateDisplay, 1000); // Update display every second (replace 1000 with your desired interval)
});

// Event listener for the stop button
document.getElementById("stopButton").addEventListener("click", function() {
    clearInterval(intervalId); // Stop updating the display
});

// Event listener for the download button
document.getElementById("downloadButton").addEventListener("click", function() {
    // Show the format select dropdown
    var formatSelect = document.getElementById("formatSelect");
    formatSelect.style.display = "block";
    
    // Event listener for the format select dropdown
    formatSelect.addEventListener("change", function() {
        var format = formatSelect.value;
        if (format) {
            // Create a dummy dataset
            var dataset = {
                data1: generateRandomData(),
                data2: generateRandomData(),
                data3: generateRandomData()
            };

            // Convert dataset to the chosen format and download it
            if (format === "doc") {
                // Convert to DOC (dummy conversion)
                var blob = new Blob([JSON.stringify(dataset)], { type: "application/msword" });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'dataset.doc';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
            } else if (format === "pdf") {
                // Convert to PDF
                var printableContent = document.getElementById("printableContent");
                printableContent.innerHTML = `
                    <h1>Dataset</h1>
                    <p>Data 1: ${dataset.data1}</p>
                    <p>Data 2: ${dataset.data2}</p>
                    <p>Data 3: ${dataset.data3}</p>
                `;
                window.print();
            } else if (format === "json") {
                var blob = new Blob([JSON.stringify(dataset)], { type: "application/json" });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'dataset.json';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
            }

            // Hide the format select dropdown after download
            formatSelect.style.display = "none";
        }
    });
});
