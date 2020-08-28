const parseLog = (content) => {
  const timeRange = [];
  const countRange = [];
  const expectedRange = [];
  content.split("\n").forEach((line) => {
    if (line) {
      const [timestamp, count, expected] = line.split("\t");
      timeRange.push(timestamp);
      count >=0 && countRange.push(count);
      expectedRange.push(expected);
    }
  });
  return [timeRange, countRange, expectedRange];
};

let data = [
  [1546300800, 1546387200], // x-values (timestamps)
  [35, 71], // y-values (series 1)
  [90, 15], // y-values (series 2)
];

const readLog = async () => {
  const reader = new FileReader();
  const file = await fetch("./burndown.txt");
  const content = await file.blob();

  reader.readAsText(content, "UTF-8");
  reader.onload = (evt) => {
    data = parseLog(evt.target.result);
    new uPlot(opts, data, document.getElementById("graph"));
  };
};

readLog();

let opts = {
  title: "Senbazuru Progress",
  id: "chart1",
  class: "my-chart",
  width: 800,
  height: 600,
  series: [
    {},
    {
      spanGaps: false,
      label: "Count",
      scale: "y",
      stroke: "red",
      fill: "rgba(0, 255, 0, 0.3)",
    },
    {
      spanGaps: false,
      label: "Expected Count",
      scale: "y",
      stroke: "blue",
      fill: "rgba(0, 0, 255, 0)",
    },
  ],
  scales: {
    "y": {
      auto: false,
      range: [0, 1000],
    }
  },
};
