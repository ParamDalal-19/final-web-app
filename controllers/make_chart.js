// // Defining CONSTANTS
// const CONFIG = { responsive: true };
// const LAYOUT = { height: 500 };

// function randomRGB(num = 255) {
//   // This function produces a random color
//   return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
//     Math.random() * 255
//   )},${Math.floor(Math.random() * 255)})`;
// }

// function randomRGBA(num = 255) {
//   // This function produces a random color with random opacity
//   return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
//     Math.random() * 255
//   )},${Math.floor(Math.random() * 255)},${Math.random()})`;
// }

// function bubble_Chart(
//     data,
//     xAttr = "",
//     yAttr = "",
//     title = "",
//     mode = "markers"
// ) {
//     // the function takes an api which from where we request data
//     // After getting the data, we extract the attributes we want to
//     // show on the x-axis and y-axis of the bar chart
//     // Finally we give the graph a title as the description

//     try {
//         console.log('Passed Data below');
//         // console.log(data)
//         let xarr = [];
//         let yarr = [];
//         const traces = [];
//         // for (i in data) {
//         xarr = (data.map(ele => ele[xAttr]));
//         yarr = (data.map(ele => ele[yAttr]));
//         traces.push({
//             x: xarr,
//             y: yarr,
//             mode: mode,
//             marker: {
//                 color: `${randomRGB()}`,
//                 size: yarr.map((num) => Math.max(15, Math.ceil(num / 5))),
//             },
//             sizemode: "area",
//             hovertemplate: `%{x}:%{y}`,
//             hoveron: "x+y"
//         });
//         // }
//         console.log("Arrays are", xarr, yarr);
//         // console.log(traces);

//         const layout = {
//             ...LAYOUT,
//             title: title,
//             xaxis: {
//                 title: xAttr,
//             },
//             yaxis: {
//                 title: yAttr,
//             },
//             margin: {
//                 r: 30,
//             },
//         };
//         const result = { data: traces, layout: layout, config: CONFIG };
//         return result;
//         // Plotly.newPlot("myPlot", traces, layout, CONFIG);
//     } catch {
//         throw new Error("Error in the plot making function. Please check if the input or the layout are prepared properly.");
//     }
// }

// function process_x_bar_chart(data, xAttr="", x2="", yAttr="", title="", orientation='none')
// {
//   console.log('Passed Data below');
//   // console.log(data)
//   let xarr = [];
//   let yarr = [];
//   let xarr2 = [];
//   const traces = [];
//   xarr = (data.map(ele => ele[xAttr]));
//   yarr = (data.map(ele => ele[yAttr]));
//   xarr2 = (data.map(ele => ele[x2]))
//   console.log(xarr,xarr2,yarr)
//   traces.push({
//     x: orientation != "h" ? xarr: yarr,
//     y: orientation != "h" ? yarr : xarr,
//     type: "bar",
//     orientation: orientation,
//     hovertemplate: `%{x}:%{y}`,
//     hoverinfo: 'x+y',
//     transforms: [{
//       type: 'groupby',
//       groups: xarr2,}],
//     width: 0.5,
//   });

//   console.log(traces);
//   const layout = {
//     ...LAYOUT,
//     barmode: 'group',
//     title: title,
//     xaxis: {
//       title: xAttr,
//       tickangle: -15,
//       tickfont: {
//       size: 13,
//     },
//     },
//     yaxis: {
//       title: yAttr,
//     },
//   };
//   const result = { data: traces, layout: layout, config: CONFIG };

//   return result;
// }

// function process_chart(data, chart_type, xAttr="", yAttr="", title="", xAttr2="", orientation='none') {
//     console.log("me yaha ghusa");
//     switch (chart_type) {
//         case "bubble_chart":
//             return bubble_Chart(data, xAttr, yAttr, title);
//         case "bar_chart":
//             return process_x_bar_chart(data, xAttr, xAttr2, yAttr, title, orientation);
//         default:
//             throw new Error("Invalid chart type");
//     }
// }

// let charts = new Map();
// charts.set("top_ten_most_clicked_sneaker_brands", {
//     bubble_chart: bubble_Chart,
//     xAttr: "Brand",
//     yAttr: "Number of Times Clicked",
//     title: "Brand vs Number of Times Clicked",
// });
// charts.set("most_clicked_coffee_machines", {
//     bar_chart: process_x_bar_chart,
//     xAttr: "Brand",
//     xAttr2: "Vendor",
//     yAttr: "Number of Clicks",
//     title: "Brand per Vendor vs Number of Times Clicked",
// });

// exports.create_chart = async (data, viz_id, chart_type, containerId, callback) => {
//     try {
//       if (charts.has(viz_id)) {
//         let chart = charts.get(viz_id);
//         if (chart_type === "bar_chart" || chart_type === "bubble_chart") {
//           const x = chart.xAttr;
//           const x2 = chart.xAttr2;
//           const y = chart.yAttr;
//           const title = chart.title;
//           const result = process_chart(data, chart_type, x, y, title, x2);
//           console.log("result mil gaya");
//           // Plotly.newPlot(containerId, result.data, result.layout, result.config);
//           callback(null, result); // Pass the result to the callback
//         } else {
//           const error = new Error("Invalid Chart Type");
//           console.log("ERROR: Invalid Chart Type");
//           callback(error, null); // Pass the error to the callback
//         }
//       } else {
//         const error = new Error("Invalid View");
//         console.log("ERROR: Invalid View");
//         callback(error, null); // Pass the error to the callback
//       }
//     } catch (err) {
//       console.log(err);
//       const error = new Error("An error occurred");
//       callback(error, null); // Pass the error to the callback
//     }
//   };

// THIS IS NEW ONE :-
// const viz = require("viz");
// import {get_vis_chart_data} from "vis_res";

// Defining CONSTANTS
const CONFIG = { responsive: true };
const LAYOUT = {
  height: 500,
  font: { size: 14 },
  automargin: true,
  hovermode: "closest",
};

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

///////////////////////////////////////
//   VISUALIZATION FUNCTIONS BELOW   //
///////////////////////////////////////

function barChart(
  data,
  xAttr = "",
  yAttr = "",
  title = "",
  barmode = "group",
  orientation = "none"
) {
  // the function takes an api which from where we request data
  // After getting the data, we extract the attributes we want to
  // show on the x-axis and y-axis of the bar chart
  // Finally we give the graph a title as the description
  // If we needed, we can add traces where the barmode will be handy

  // try {
  // console.log('Passed Data below');
  // console.log(data)
  let xarr = [];
  let yarr = [];
  const traces = [];
  // for (i in data) {
  xarr = data.map((ele) => ele[xAttr]);
  yarr = data.map((ele) => ele[yAttr]);
  // xarr = data.map(elem => elem[xAttr]);
  // yarr = data.map(elem => elem[yAttr]);
  // console.log("Arrays are", xarr, yarr);
  traces.push({
    x: orientation != "h" ? xarr : yarr,
    y: orientation != "h" ? yarr : xarr,
    type: "bar",
    // marker: {
    //   color: `${randomRGB()}`,
    // },
    orientation: orientation,
    hovertemplate: `%{x}:%{y}`,
    hoverinfo: "x+y",
  });
  // }
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
  };
  const result = { data: traces, layout: layout, config: CONFIG };
  // console.log("here is the result for chart :-",result)
  return result;
  // Plotly.newPlot("myPlot", traces, layout, CONFIG);
  // } catch {
  //   throw new Error("Error in the plot making function. Please check if the input or the layout are prepared properly.");
  // }
}

function barhChart(
  data,
  xAttr = "",
  yAttr = "",
  title = "",
  orientation = "h"
) {
  barChart(data, xAttr, yAttr, title, orientation);
}

function process_x_bar_chart(
  data,
  xAttr = "",
  x2 = "",
  yAttr = "",
  title = "",
  orientation = "none"
) {
  // console.log('Passed Data below');
  // console.log(data)
  let xarr = [];
  let yarr = [];
  let xarr2 = [];
  const traces = [];
  xarr = data.map((ele) => ele[xAttr]);
  yarr = data.map((ele) => ele[yAttr]);
  xarr2 = data.map((ele) => ele[x2]);
  // console.log(xarr,xarr2,yarr)
  traces.push({
    x: orientation != "h" ? xarr : yarr,
    y: orientation != "h" ? yarr : xarr,
    type: "bar",
    orientation: orientation,
    hovertemplate: `%{x}: %{y}`,
    hoverinfo: "x+y",
    transforms: [
      {
        type: "groupby",
        groups: xarr2,
      },
    ],
    width: 0.5,
  });

  // console.log(traces);
  const layout = {
    ...LAYOUT,
    barmode: "group",
    title: title,
    xaxis: {
      title: xAttr,
      tickangle: -30,
      tickfont: {
        size: 10,
      },
    },
    yaxis: {
      title: yAttr,
    },
  };
  const result = { data: traces, layout: layout, config: CONFIG };
  // console.log("here is the result for chart :-",result)
  return result;
}

function process_x_bubble_chart(
  data,
  xAttr = "",
  x2 = "",
  yAttr = "",
  title = "",
  orientation = "none"
) {
  // console.log('Passed Data below');
  // console.log(data)
  let xarr = [];
  let yarr = [];
  let xarr2 = [];
  const traces = [];
  xarr = data.map((ele) => ele[xAttr]);
  yarr = data.map((ele) => ele[yAttr]);
  xarr2 = data.map((ele) => ele[x2]);
  // let grouped_x = [];
  // for (let i = 0; i < yarr.length; i++) {
  //   grouped_x.push((`(${xarr[i]}, ${xarr2[i]})`));
  // }
  // console.log(xarr,x2,yarr)
  traces.push({
    x: orientation != "h" ? xarr : yarr,
    y: orientation != "h" ? yarr : xarr,
    // type: "bar",
    mode: "markers",
    marker: {
      size: yarr.map((num) => Math.min(Math.max(15, Math.ceil(num / 2)), 40)),
    },
    orientation: orientation,
    hovertemplate: `%{x}: %{y}`,
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
    title: title,
    xaxis: {
      title: xAttr,
      tickangle: -30,
      tickfont: {
        size: 10,
      },
    },
    yaxis: {
      title: yAttr,
    },
  };
  const result = { data: traces, layout: layout, config: CONFIG };

  return result;
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
        // color: `${randomRGB()}`,
        size: yarr.map((num) => Math.min(Math.max(15, Math.ceil(num / 5)), 40)),
      },
      sizemode: "area",
      hovertemplate: `%{x}:%{y}`,
      hoveron: "x+y",
    });
    // }
    // console.log("Arrays are", xarr, yarr);
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
    // console.log("here is the result for chart :-",result)
    return result;
    // Plotly.newPlot("myPlot", traces, layout, CONFIG);
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function pieChart(data, labelAttr = "", valueAttr = "", title = "") {
  try {
    console.log("Passed Data below");
    console.log(data);
    let xarr = [];
    let yarr = [];
    const traces = [];
    // for (i in data) {
    xarr = data.map((ele) => ele[labelAttr]);
    yarr = data.map((ele) => ele[valueAttr]);
    console.log("Arrays are", xarr, yarr);
    traces.push({
      labels: xarr,
      values: yarr,
      type: "pie",
      // marker: {
      //   colors: yarr.map((item) => `${randomRGB()}`),
      // },
      hoverinfo: "label+value",
      textinfo: "label+percent",
      // domain: {
      //   row: parseInt(i / 2),
      //   col: i % 2,
      // },
    });
    // }
    console.log(traces);

    const layout = {
      ...LAYOUT,
      title: title,
      showlegend: false,
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

function lineChart(
  data,
  xAttr = "X-axis",
  yAttr = "Y-axis",
  title = "Example Graph",
  mode = "lines"
) {
  try {
    console.log("Passed Data below");
    console.log(data);
    let xarr = [];
    let yarr = [];
    const traces = [];
    // for (i in data) {
    xarr = data.map((ele) => ele[xAttr]);
    yarr = data.map((ele) => ele[yAttr]);
    console.log("Arrays are", xarr, yarr);
    traces.push({
      x: xarr,
      y: yarr,
      text: xarr,
      textposition: "auto",
      mode: mode,
      text: "Sample Data",
      line: {
        shape: "spline",
        // color: `${randomRGB()}`,
        width: 2,
      },
      marker: {
        // color: `${randomRGB()}`,
        size: 10,
      },
      type: "scatter",
      hoverinfo: "x+y",
    });
    // }
    console.log(traces);

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

function scatterPlot(
  data,
  xAttr = "X-axis",
  yAttr = "Y-axis",
  title = "Example Graph",
  mode = "markers"
) {
  try {
    console.log("Passed Data below");
    console.log(data);
    let xarr = [];
    let yarr = [];
    const traces = [];
    // for (i in data) {
    xarr = data.map((ele) => ele[xAttr]);
    yarr = data.map((ele) => ele[yAttr]);
    console.log("Arrays are", xarr, yarr);
    traces.push({
      x: xarr,
      y: yarr,
      text: xarr,
      textposition: "auto",
      mode: mode,
      text: "Sample Data",
      line: {
        shape: "spline",
        // color: `${randomRGB()}`,
        width: 2,
      },
      marker: {
        // color: `${randomRGB()}`,
        size: 18,
      },
      type: "scatter",
      hoverinfo: "x+y",
    });
    // }
    console.log(traces);

    const layout = {
      ...LAYOUT,
      title: title,
      xaxis: {
        title: xAttr,
      },
      yaxis: {
        title: yAttr.replace("_", " "),
        pad: 10,
      },
      plot_bgcolor: "rgb(250, 250, 250)",
      hovermode: "closest",
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

function dotPlot(data, xAttr = "", yAttr = "", title = "", mode = "markers") {
  scatterPlot(data, yAttr, xAttr, title, mode);
}

function areaOverlayPlot(data, xAttr = "", yAttr = "", title = "") {
  try {
    const xarr = [];
    const yarr = [];
    const traces = [];
    for (i in data) {
      xarr.push(data[i].map((item) => item[xAttr]));
      yarr.push(data[i].map((item) => item[yAttr]));
      traces.push({
        x: xarr[i],
        y: yarr[i],
        type: "scatter",
        fill: i == 0 ? "tozeroy" : "tonexty",
        hoverinfo: "x+y",
      });
    }
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

function areaStackedPlot(
  data,
  xAttr = "",
  yAttr = "",
  title = "",
  groupnorm = "percent"
) {
  try {
    const xarr = [];
    const yarr = [];
    const traces = [];
    for (i in data) {
      xarr.push(data[i].map((item) => item[xAttr]));
      yarr.push(data[i].map((item) => item[yAttr]));
      traces.push({
        x: xarr[i],
        y: yarr[i],
        stackgroup: "one",
        groupnorm: groupnorm,
        hoverinfo: "x+y",
      });
    }
    const layout = {
      ...LAYOUT,
      title: title,
      xaxis: {
        title: xAttr,
      },
      yaxis: {
        title: yAttr,
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

function histogram(data, xAttr = "", title = "", barmode = "overlay") {
  try {
    // const xarr = [];
    const traces = [];
    let opacity = 0.1;
    for (i in data) {
      console.log(i);
      console.log(data[i]);
      // xarr.push(data[i]);
      traces.push({
        type: "histogram",
        name: `${i}`,
        autobinx: false,
        x: data[i],
        marker: {
          color: `${randomRGBA(100)}`,
          line: {
            color: `${randomRGB()}`,
            opacity: 0.5,
            width: 1,
          },
        },
      });
    }
    const layout = {
      ...LAYOUT,
      title: title,
      xaxis: {
        title: xAttr,
      },
      yaxis: {
        title: "count",
      },
      barmode: barmode,
      bargroupgap: 10,
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

let charts = new Map();
list_special_views = ["most_clicked_coffee_machines", "most_clicked_product"];
// top_ten_most_clicked_sneaker_brands
charts.set("most_clicked_coffee_machines", {
  bar_chart: process_x_bar_chart,
  bubble_chart: process_x_bubble_chart,
  xAttr: "Brand",
  xAttr2: "Vendor",
  yAttr: "Number of Clicks",
  title: "Brand per Vendor vs Number of Times Clicked",
});
// mmost_frequent_product_clicks_by_category
charts.set("most_frequent_product_clicks_by_category", {
  pie_chart: pieChart,
  bar_chart: barChart,
  bubble_chart: bubbleChart,
  xAttr: "Category Name",
  yAttr: "Click Count",
  title: "Number of Clicks per Category",
});
// most_common_experience_type_for_sneakers
charts.set("most_common_experience_type_for_sneakers", {
  pie_chart: pieChart,
  bar_chart: barChart,
  bubble_chart: bubbleChart,
  xAttr: "Experience Type",
  yAttr: "Use Count",
  title: "Number of Clicks per Category",
});
// top_ten_most_clicked_sneaker_brands
charts.set("top_ten_most_clicked_sneaker_brands", {
  bubble_chart: bubbleChart,
  bar_chart: barChart,
  xAttr: "Brand",
  yAttr: "Number of Times Clicked",
  title: "Top 10 Sneaker Brand Clicked",
});
// most_clicked_product
charts.set("most_clicked_product", {
  bar_chart: process_x_bar_chart,
  bubble_chart: process_x_bubble_chart,
  xAttr: "Product",
  xAttr2: "Category",
  yAttr: "Number Of Times Clicked",
  title: "Product with most Clicks",
});

exports.create_chart = (data, viz_id, chart_type, callback) => {
  if (charts.has(viz_id)) {
    let chart = charts.get(viz_id);
    // console.log(data);
    if (chart.hasOwnProperty(chart_type)) {
      if (
        list_special_views.includes(viz_id)
        // (chart_type == "bar_chart" &&
        //   viz_id == "most_clicked_coffee_machines") ||
        // (chart_type == "bubble_chart" &&
        //   viz_id == "most_clicked_coffee_machines")
      ) {
        // console.log("pehle loop me gaya");
        x = chart["xAttr"];
        x2 = chart["xAttr2"];
        y = chart["yAttr"];
        title = chart["title"];
        let chartResult = chart[chart_type](data, x, x2, y, title);
        // console.log("result in making function mil gaya now sending to router", chartResult);
        callback(chartResult); // Call the callback function with the result
      } else {
        // console.log("dusre loop me gaya");
        x = charts.get(viz_id)["xAttr"];
        y = charts.get(viz_id)["yAttr"];
        title = charts.get(viz_id)["title"];
        let chartResult = chart[chart_type](data, x, y, title);
        // console.log("result in making function mil gaya now sending to frontend", chartResult);
        callback(chartResult); // Call the callback function with the result
      }
    } else {
      console.log("ERROR: Invalid Chart Type");
    }
  } else {
    console.log("ERROR: Invalid View");
  }
};
