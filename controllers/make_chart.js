// Defining CONSTANTS
const CONFIG = { responsive: true };
const LAYOUT = { height: 500 };

function randomRGB(num = 255) {
  // This function produces a random color
  return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;
}

function randomRGBA(num = 255) {
  // This function produces a random color with random opacity
  return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)},${Math.random()})`;
}

function bubbleChart(
  data,
  xAttr = "",
  yAttr = "",
  title = "",
  mode = "markers"
) {
  // the function takes an api which from where we request data
  // After getting the data, we extract the attributes we want to
  // show on the x-axis and y-axis of the bar chart
  // Finally we give the graph a title as the description

  try {
    console.log("Passed Data below");
    // console.log(data)
    let xarr = [];
    let yarr = [];
    const traces = [];
    // for (i in data) {
    xarr = data.map((ele) => ele[xAttr]);
    yarr = data.map((ele) => ele[yAttr]);
    traces.push({
      x: xarr,
      y: yarr,
      mode: mode,
      marker: {
        color: `${randomRGB()}`,
        size: yarr.map((num) => Math.max(15, Math.ceil(num / 5))),
      },
      sizemode: "area",
      hovertemplate: `%{x}:%{y}`,
      hoveron: "x+y",
    });
    // }
    console.log("Arrays are", xarr, yarr);
    // console.log(traces);

    const layout = {
      ...LAYOUT,
      title: title,
      xaxis: {
        title: xAttr,
      },
      yaxis: {
        title: yAttr,
      },
      margin: {
        r: 30,
      },
    };
    const result = { data: traces, layout: layout, config: CONFIG };
    return result;
    // Plotly.newPlot("myPlot", traces, layout, CONFIG);
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function process_x_bar_chart(
  data,
  xAttr = "",
  x2 = "",
  yAttr = "",
  title = "",
  orientation = "none"
) {
  console.log("Passed Data below");
  // console.log(data)
  let xarr = [];
  let yarr = [];
  let xarr2 = [];
  const traces = [];
  xarr = data.map((ele) => ele[xAttr]);
  yarr = data.map((ele) => ele[yAttr]);
  xarr2 = data.map((ele) => ele[x2]);
  console.log(xarr, xarr2, yarr);
  traces.push({
    x: orientation != "h" ? xarr : yarr,
    y: orientation != "h" ? yarr : xarr,
    type: "bar",
    orientation: orientation,
    hovertemplate: `%{x}:%{y}`,
    hoverinfo: "x+y",
    transforms: [
      {
        type: "groupby",
        groups: xarr2,
      },
    ],
    width: 0.5,
  });

  console.log(traces);
  const layout = {
    ...LAYOUT,
    barmode: "group",
    title: title,
    xaxis: {
      title: xAttr,
      tickangle: -15,
      tickfont: {
        size: 13,
      },
    },
    yaxis: {
      title: yAttr,
    },
  };
  const result = { data: traces, layout: layout, config: CONFIG };

  return result;
}

function process_chart(
  data,
  chart_type,
  xAttr = "",
  yAttr = "",
  title = "",
  xAttr2 = "",
  orientation = "none"
) {
  switch (chart_type) {
    case "bubble_chart":
      return bubbleChart(data, xAttr, yAttr, title);
    case "bar_chart":
      return process_x_bar_chart(
        data,
        xAttr,
        xAttr2,
        yAttr,
        title,
        orientation
      );
    default:
      throw new Error("Invalid chart type");
  }
}

let charts = new Map();
charts.set("top_ten_most_clicked_sneaker_brands", {
  bubble_chart: bubbleChart,
  xAttr: "Brand",
  yAttr: "Number of Times Clicked",
  title: "Brand vs Number of Times Clicked",
});
charts.set("most_clicked_coffee_machines", {
  bar_chart: process_x_bar_chart,
  xAttr: "Brand",
  xAttr2: "Vendor",
  yAttr: "Number of Clicks",
  title: "Brand per Vendor vs Number of Times Clicked",
});

exports.create_chart = async (data, viz_id, chart_type, containerId) => {
  return new Promise((resolve, reject) => {
    if (charts.has(viz_id)) {
      let chart = charts.get(viz_id);
      if (chart_type === "bar_chart" || chart_type === "bubble_chart") {
        const x = chart.xAttr;
        const x2 = chart.xAttr2;
        const y = chart.yAttr;
        const title = chart.title;
        const result = process_chart(data, chart_type, x, y, title, x2);
        Plotly.newPlot(containerId, result.data, result.layout, result.config);
        resolve(result);
      } else {
        const x = chart.xAttr;
        const y = chart.yAttr;
        const title = chart.title;
        const result = chart[chart_type](data, x, y, title);
        Plotly.newPlot(containerId, result.data, result.layout, result.config);
        resolve(result);
      }
    } else {
      console.log("ERROR: Invalid View");
      reject("ERROR: Invalid View");
    }
  });
};
