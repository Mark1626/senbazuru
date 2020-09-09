const parseLog = (content) => {
  const timeRange = [];
  const countRange = [];
  const expectedRange = [];
  content.split("\n").forEach((line) => {
    if (line) {
      const [timestamp, count, expected] = line.split("\t");
      timeRange.push(Number(timestamp));
      count >= 0 && countRange.push(Number(count));
      expectedRange.push(Number(expected));
    }
  });
  return [timeRange, countRange, expectedRange];
};

const populateGraph = async () => {
  const reader = new FileReader();
  const file = await fetch("./burndown.txt");
  const content = await file.blob();

  reader.readAsText(content, "UTF-8");
  reader.onload = (evt) => {
    const data = parseLog(evt.target.result);
    new uPlot(opts, data, document.getElementById("graph"));
  };
};

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
    y: {
      auto: false,
      range: [0, 1000],
    },
  },
};

// Progress list
const populateAchievement = async () => {
  const progress = document.getElementById("progress");
  const ul = document.createElement("ul");

  const reader = new FileReader();
  const file = await fetch("./achievements.txt");
  const content = await file.blob();

  reader.readAsText(content, "UTF-8");
  reader.onload = (evt) => {
    const textContent = evt.target.result;
    textContent.split("\n").forEach((line) => {
      const [date, desc] = line.split("\t");
      const li = document.createElement("li");
      li.innerHTML = `<span class="date">${date}</span><span class="desc">${desc}</span>`;
      ul.appendChild(li);
    });
  };
  progress.appendChild(ul);
};

Promise.all([populateGraph(), populateAchievement()]);
