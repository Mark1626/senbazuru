const getUnixTime = (day) => new Date(day).getTime() / 1000;

const parseLog = (content) => {
  const dateRange = [];
  const countRange = [];
  content.split("\n").forEach((line) => {
    if (line) {
      const [day, count] = line.split("\t");
      countRange.push(count);
      dateRange.push(getUnixTime(day));
    }
  });
  return [dateRange, countRange];
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
    new uPlot(opts, data, document.body);
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
      // initial toggled state (optional)
      show: true,
      spanGaps: false,
      // in-legend display
      label: "Count",
      // value: (self, rawValue) => rawValue + "C",

      scale: "y",
      // series style
      stroke: "red",
      width: 1,
      fill: "rgba(255, 0, 0, 0.3)",
      dash: [10, 5],
    },
  ],
  // axes: [
  //   {},
  //   {
  //     scale: "y",
  //     // values: (self, ticks) => ticks.map(rawValue => rawValue.toFixed(1) + "%"),
  //   },
  // ],
  scales: {
    "y": {
      auto: false,
      range: [0, 1000],
    }
  },
};
