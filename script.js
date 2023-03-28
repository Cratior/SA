var intervalId;

function stop() {
    clearInterval(intervalId);
}

function start() {
    startSort();
}

var bars = [];

function restart() {
    bars.sort(function(a, b) {
        return a - b;
    });
    drawBars();
}

function randomize() {
    generate();
}

function generate() {
    var numBars = document.getElementById("numBars").value;
    bars = [];
    for (var i = 0; i < numBars; i++) {
        bars.push(Math.floor(Math.random() * 100) + 1);
    }
    drawBars();
}

function drawBars() {
    var barsDiv = document.getElementById("bars");
    barsDiv.innerHTML = "";
    for (var i = 0; i < bars.length; i++) {
        var barDiv = document.createElement("div");
        barDiv.classList.add("bar");
        barDiv.style.height = bars[i] * 4 + "px";
        barsDiv.appendChild(barDiv);
    }
}

function selectionSort(speed) {
    var bars = [/* your array of values */];
    var i = 0;
    var intervalId = setInterval(function() {
        if (i < bars.length - 1) {
            var j = i + 1;
            var swapped = false;
            while (j < bars.length) {
                var barsDiv = document.getElementById("bars");
                barsDiv.childNodes[j].classList.add("active");
                barsDiv.childNodes[j - 1].classList.add("active");
                var comparisonLabel = document.getElementById("comparison-label");
                comparisonLabel.textContent = "Comparing bars " + (j - 1) + " and " + j;
                if (bars[j] < bars[j - 1]) {
                    var temp = bars[j];
                    bars[j] = bars[j - 1];
                    bars[j - 1] = temp;
                    swapped = true;
                }
                j++;
            }
            drawBars();
            barsDiv.childNodes[j - 1].classList.remove("active");
            barsDiv.childNodes[j - 2].classList.remove("active");
            if (!swapped) {
                clearInterval(intervalId);
                var barsDiv = document.getElementById("bars");
                for (var i = 0; i < barsDiv.childNodes.length; i++) {
                    barsDiv.childNodes[i].classList.remove("sorted");
                }
                var barDivI = barsDiv.childNodes[0];
                barDivI.classList.add("sorted");
            }
            var comparisonLabel = document.getElementById("comparison-label");
            comparisonLabel.textContent = "";
            i++;
        }
    }, 1000 / speed);
}
function bubbleSort(speed) {
    var i = 0;
    var j = 0;
    intervalId = setInterval(function() {
        if (i < bars.length) {
            if (j < bars.length - i - 1) {
                var bar1 = bars[j];
                var bar2 = bars[j + 1];
                if (bar1 > bar2) {
                    bars[j] = bar2;
                    bars[j + 1] = bar1;
                    drawBars();
                    var barsDiv = document.getElementById("bars");
                    barsDiv.childNodes[j].classList.add("active");
                    barsDiv.childNodes[j + 1].classList.add("active");
                    var comparisonLabel = document.getElementById("comparison-label");
                    comparisonLabel.textContent = "Swapping bars " + j + " and " + (j + 1);
                }
                j++;
            } else {
                var barsDiv = document.getElementById("bars");
                var barDivI = barsDiv.childNodes[bars.length - i - 1];
                barDivI.classList.add("sorted");
                i++;
                j = 0;
            }
        } else {
            clearInterval(intervalId);
            var barsDiv = document.getElementById("bars");
            var barDivI = barsDiv.childNodes[0];
            barDivI.classList.add("sorted");
        }
        barsDiv.childNodes[j].classList.remove("active");
        barsDiv.childNodes[j + 1].classList.remove("active");
        var comparisonLabel = document.getElementById("comparison-label");
        comparisonLabel.textContent = "";
    }, 1000 / speed);
}

function startSort() {
    var speed = document.getElementById("speed").value;
    var algorithm = document.getElementById("algorithm").value;
    switch (algorithm) {
        case "bubble":
            bubbleSort(speed);
            break;
        case "selection":
            selectionSort(speed);
            break;
    }
}

function restart() {
    bars.sort(function(a, b) {
        return a - b;
    });
    drawBars();
    var barsDiv = document.getElementById("bars");
    for (var i = 0; i < barsDiv.childNodes.length; i++) {
        barsDiv.childNodes[i].classList.remove("sorted");
    }
    var comparisonLabel = document.getElementById("comparison-label");
    comparisonLabel.textContent = "";
}

function randomize() {
    generate();
    var barsDiv = document.getElementById("bars");
    for (var i = 0; i < barsDiv.childNodes.length; i++) {
        barsDiv.childNodes[i].classList.remove("sorted");
    }
    var comparisonLabel = document.getElementById("comparison-label");
    comparisonLabel.textContent = "";
}

generate();