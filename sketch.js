let developmentsData = [];
let boroughColors = {};
let maxTdsSum = 0;
let boroughTdsSums = {}; // To store summed tds_number for each borough

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noLoop(); // We want a static image

  // Hardcoded Sample Data (based on your headers)
  // In a real scenario, this would come from your CSV
  developmentsData = [
    { borough: "Bronx", name: "Development A", tds: 150 },
    { borough: "Bronx", name: "Development B", tds: 200 },
    { borough: "Manhattan", name: "Development C", tds: 300 },
    { borough: "Manhattan", name: "Development D", tds: 100 },
    { borough: "Brooklyn", name: "Development E", tds: 250 },
    { borough: "Brooklyn", name: "Development F", tds: 180 },
    { borough: "Queens", name: "Development G", tds: 220 },
    { borough: "Queens", name: "Development H", tds: 120 },
    { borough: "Staten Island", name: "Development I", tds: 80 }
  ];

  processDataForBarChart();
  setupColorsForBoroughs();
}

function processDataForBarChart() {
  // Sum tds_number for each borough
  for (let data of developmentsData) {
    if (boroughTdsSums[data.borough]) {
      boroughTdsSums[data.borough] += data.tds;
    } else {
      boroughTdsSums[data.borough] = data.tds;
    }
    maxTdsSum = max(maxTdsSum, boroughTdsSums[data.borough]);
  }
}

function setupColorsForBoroughs() {
  let uniqueBoroughs = Object.keys(boroughTdsSums);
  for (let i = 0; i < uniqueBoroughs.length; i++) {
    let hueVal = map(i, 0, uniqueBoroughs.length, 0, 300);
    boroughColors[uniqueBoroughs[i]] = color(hueVal, 80, 70);
  }
}

function draw() {
  background(240); // Light background

  let barWidth =
    (width - 100) / Object.keys(boroughTdsSums).length - 20;
  let x = 50 + barWidth / 2;
  let baseY = height - 50;

  textAlign(CENTER, TOP);
  textSize(24);
  fill(50);
  text("Total TDS Number by Borough", width / 2, 20);

  textAlign(CENTER, BOTTOM);
  textSize(12);

  for (let borough in boroughTdsSums) {
    let tdsSum = boroughTdsSums[borough];
    let barHeight = map(
      tdsSum,
      0,
      maxTdsSum,
      0,
      height - 150
    );

    fill(boroughColors[borough]);
    noStroke();
    rectMode(CENTER);
    rect(x, baseY - barHeight / 2, barWidth, barHeight);

    fill(50);
    text(borough, x, baseY + 5);
    text(tdsSum, x, baseY - barHeight - 5);

    x += barWidth + 20;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
