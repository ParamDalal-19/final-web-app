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

function barChart(data, title = "", barmode = "group", orientation = "none") {
  const firstObject = data[0];
  const columnNames = Object.keys(firstObject);

  const xAttribute = columnNames[0];
  const yAttribute = columnNames[1];

  let xArr = [];
  let yArr = [];
  const traces = [];

  xArr = data.map((ele) => ele[xAttribute]);
  yArr = data.map((ele) => ele[yAttribute]);

  const shades = [
    "#3386FF",
    "#33D9B2",
    "#FF59A3",
    "#FF7939",
    "#28C3FF",
    "#00B39A",
    // "#FFFA48",
    "#FF625D",
  ];

  const randomIndex = Math.floor(Math.random() * shades.length);
  const color = shades[randomIndex];

  traces.push({
    x: orientation !== "h" ? xArr : yArr,
    y: orientation !== "h" ? yArr : xArr,
    type: "bar",
    orientation: orientation,
    hovertemplate: `%{x}: %{y}`,
    hoverinfo: "x+y",
    marker: {
      color: color, // Set the color of the bars to a random shade
    },
  });

  const layout = {
    ...LAYOUT,
    title: {
      text: title,
      font: {
        family: "Arial",
        size: 16,
        color: "#777777",
      },

      x: 0.5, // Center the chart title
    },
    xaxis: {
      title: {
        text: xAttribute,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      showgrid: true, // Display gridlines along the x-axis
      tickfont: {
        family: "Arial",
        size: 12,
        color: "#777777",
      },
    },
    yaxis: {
      title: {
        text: yAttribute,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      showgrid: true, // Display gridlines along the y-axis
      tickfont: {
        family: "Arial",
        size: 12,
        color: "#777777",
      },
    },
    plot_bgcolor: "white", // Set the background color of the chart
    margin: {
      l: 70,
      r: 20,
      t: 90,
      b: 75,
    },
    bargap: 0.2, // Adjust the gap between bars
    bargroupgap: 0.1, // Adjust the gap between groups of bars
  };

  const result = { data: traces, layout: layout, config: CONFIG };
  return result;
}

function barhChart(data, title) {
  try {
    const firstObject = data[0];
    const columnNames = Object.keys(firstObject);

    const xatribute = columnNames[0];
    const yatribute = columnNames[1];
    let xarr = [];
    let yarr = [];
    const traces = [];

    xarr = data.map((ele) => ele[xatribute]);
    yarr = data.map((ele) => ele[yatribute]);

    const cellColors = [
      "#3386FF",
      "#33D9B2",
      "#FF59A3",
      "#FF7939",
      "#28C3FF",
      "#00B39A",
    ];

    traces.push({
      type: "table",
      header: {
        values: [xatribute],
        align: ["center"],
        line: { width: 0, color: "white" },
        font: { family: "Arial", size: 16, color: "#777777" },
        height: 30,
      },
      cells: {
        values: [xarr],
        align: ["center"],
        line: { color: "#506784", width: 0 },
        fill: { color: ["white"] },
        font: {
          family: "Arial",
          size: 120,
          color: cellColors[Math.floor(Math.random() * cellColors.length)],
        },
        height: 80,
      },
    });

    const LAYOUT = {
      margin: {
        t: 160,
      },
      height: 500,
    };

    const CONFIG = {};

    return { data: traces, layout: LAYOUT, config: CONFIG };
  } catch (error) {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function process_x_bar_chart(data, title = "", orientation = "none") {
  const firstObject = data[0];
  const columnNames = Object.keys(firstObject);

  const xatribute = columnNames[1];
  const x2atribute = columnNames[0];
  const yatribute = columnNames[2];

  let xarr = [];
  let yarr = [];
  let xarr2 = [];
  const traces = [];
  xarr = data.map((ele) => ele[xatribute]);
  yarr = data.map((ele) => ele[yatribute]);
  xarr2 = data.map((ele) => ele[x2atribute]);

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
    marker: {
      color: "rgb(63, 81, 181)", // Set the bar color
    },
  });

  const layout = {
    ...LAYOUT,
    barmode: "group",
    title: {
      text: title,
      font: {
        family: "Arial",
        size: 16,
        color: "#777777",
      },
    },
    xaxis: {
      title: {
        text: xatribute,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },

      tickfont: {
        family: "Arial",
        size: 12,
        color: "#777777",
      },
    },
    yaxis: {
      title: {
        text: yatribute,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
        tickfont: {
          family: "Arial",
          size: 12,
          color: "#777777",
        },
      },
    },
    plot_bgcolor: "white", // Set the background color of the chart
    margin: {
      r: 30,
    },
  };

  const result = { data: traces, layout: layout, config: CONFIG };
  return result;
}

function process_x_bubble_chart(data, title = "", orientation = "none") {
  const firstObject = data[0];
  const columnNames = Object.keys(firstObject);

  const xatribute = columnNames[1];
  const x2atribute = columnNames[0];
  const yatribute = columnNames[2];

  let xarr = [];
  let yarr = [];
  let xarr2 = [];
  const traces = [];
  xarr = data.map((ele) => ele[xatribute]);
  yarr = data.map((ele) => ele[yatribute]);
  xarr2 = data.map((ele) => ele[x2atribute]);

  // Define an array of colors for each bubble
  const colors = [
    "#3386FF",
    "#33D9B2",
    "#FFD135",
    "#FF59A3",
    "#B341C4",
    "#6DD965",
    "#FF7939",
    "#28C3FF",
    "#FFAC1A",
    "#9FDC5D",
    "#FF448E",
    "#00B39A",
    "#FFFA48",
    "#916F61",
    "#FF625D",
  ];
  // Add more colors to the array if needed

  traces.push({
    x: orientation != "h" ? xarr : yarr,
    y: orientation != "h" ? yarr : xarr,
    mode: "markers",
    marker: {
      size: yarr.map((num) => Math.min(Math.max(15, Math.ceil(num / 2)), 40)),
      color: colors, // Assign colors array to the marker color property
      opacity: 0.7, // Set the marker opacity
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

  const layout = {
    ...LAYOUT,
    title: {
      text: title,
      font: {
        family: "Arial",
        size: 16,
        color: "#777777",
      },
    },
    xaxis: {
      title: {
        text: xatribute,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      tickfont: {
        family: "Arial",
        size: 12,
        color: "#777777",
      },
    },
    yaxis: {
      title: {
        text: yatribute,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      tickfont: {
        family: "Arial",
        size: 12,
        color: "#777777",
      },
    },
  };
  const result = { data: traces, layout: layout, config: CONFIG };

  return result;
}

function bubbleChart(data, title = "", mode = "markers") {
  try {
    const firstObject = data[0];
    const columnNames = Object.keys(firstObject);

    const xatribute = columnNames[0];
    const yatribute = columnNames[1];
    let xarr = [];
    let yarr = [];
    const traces = [];

    xarr = data.map((ele) => ele[xatribute]);
    yarr = data.map((ele) => ele[yatribute]);

    const colors = [
      "#3386FF",
      "#33D9B2",
      "#FFD135",
      "#FF59A3",
      "#B341C4",
      "#6DD965",
      "#FF7939",
      "#28C3FF",
      "#FFAC1A",
      "#9FDC5D",
      "#FF448E",
      "#00B39A",
      "#FFFA48",
      "#916F61",
      "#FF625D",
    ];
    // Add more colors to the array if needed

    traces.push({
      x: xarr,
      y: yarr,
      mode: mode,
      marker: {
        size: yarr.map((num) => Math.min(Math.max(15, Math.ceil(num / 5)), 40)),
        color: colors, // Assign colorArray to the marker color property
        opacity: 0.7, // Set the marker opacity
        line: {
          color: "rgba(0, 0, 0, 0.5)", // Set the marker border color
          width: 1, // Set the marker border width
        },
      },
      sizemode: "area",
      hovertemplate: `%{x}:%{y}`,
      hoveron: "x+y",
    });

    const layout = {
      ...LAYOUT,
      title: {
        text: title,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      xaxis: {
        title: {
          text: xatribute,
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
        tickfont: {
          family: "Arial",
          size: 12,
          color: "#777777",
        },
      },
      yaxis: {
        title: {
          text: yatribute,
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
        tickfont: {
          family: "Arial",
          size: 12,
          color: "#777777",
        },
      },
      margin: {
        r: 30,
      },
    };

    const result = { data: traces, layout: layout, config: CONFIG };
    return result;
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function pieChart(data, title) {
  try {
    const firstObject = data[0];
    const columnNames = Object.keys(firstObject);

    const xatribute = columnNames[0];
    const yatribute = columnNames[1];

    let xarr = [];
    let yarr = [];
    const traces = [];
    xarr = data.map((ele) => ele[xatribute]);
    yarr = data.map((ele) => ele[yatribute]);
    traces.push({
      labels: xarr,
      values: yarr,
      type: "pie",
      hoverinfo: "label+value",
      textinfo: "label+percent",
      // Add modern styling options here
      marker: {
        colors: [
          "#3386FF",
          "#33D9B2",
          "#FFD135",

          // "#B341C4",
          // "#6DD965",
          // "#FF7939",
          // "#28C3FF",
          "#FFAC1A",
          "#FF59A3",
          "#9FDC5D",
          "#FF448E",
          // "#00B39A",
          "#FFFA48",
          // "#916F61",
          "#FF625D",
        ], // Set custom colors for the pie slices
      },
      automargin: true, // Automatically adjust the margins for a better fit
    });

    const layout = {
      ...LAYOUT,
      title: {
        text: title,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      showlegend: true,
      // plot_bgcolor: "#F7F7F7", // Set the plot background color
      // paper_bgcolor: "#FFFFFF", // Set the paper background color
    };

    const result = { data: traces, layout: layout, config: CONFIG };
    return result;
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function lineChart(data, title, mode = "lines") {
  try {
    const firstObject = data[0];
    const columnNames = Object.keys(firstObject);
    const xatribute = columnNames[0];
    const yatribute = columnNames[1];

    let xarr = [];
    let yarr = [];
    const traces = [];

    xarr = data.map((ele) => ele[xatribute]);
    yarr = data.map((ele) => ele[yatribute]);

    const shades = [
      "#3386FF",
      "#33D9B2",
      "#FF59A3",
      "#FF7939",
      "#28C3FF",
      "#00B39A",
      // "#FFFA48",
      "#FF625D",
    ];

    const randomIndex = Math.floor(Math.random() * shades.length);
    const color = shades[randomIndex];

    traces.push({
      x: xarr,
      y: yarr,
      text: xarr,
      textposition: "auto",
      mode: mode,
      text: "Sample Data",
      line: {
        shape: "spline",
        width: 2,
        color: color, // Set the line color to a random shade
      },
      marker: {
        size: 10,
        color: color, // Set the marker color to the same random shade
      },
      type: "scatter",
      hoverinfo: "x+y",
    });

    const layout = {
      ...LAYOUT,
      title: {
        text: title,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      xaxis: {
        title: {
          text: xatribute,
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
        tickfont: {
          family: "Arial",
          size: 12,
          color: "#777777",
        },
      },
      yaxis: {
        title: {
          text: yatribute,
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
        tickfont: {
          family: "Arial",
          size: 12,
          color: "#777777",
        },
      },
      margin: {
        r: 30,
      },
    };

    const result = { data: traces, layout: layout, config: CONFIG };
    return result;
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function scatterPlot(data, title, mode = "markers") {
  try {
    const firstObject = data[0];
    const columnNames = Object.keys(firstObject);
    const xatribute = columnNames[0];
    const yatribute = columnNames[1];

    let xarr = [];
    let yarr = [];
    const traces = [];

    xarr = data.map((ele) => ele[xatribute]);
    yarr = data.map((ele) => ele[yatribute]);

    const colors = [
      "#007BFF",
      "#00C49F",
      "#FFC107",
      "#FF6384",
      "#6A2135",
      "#4DB6AC",
      "#AB47BC",
      "#FF5722",
      "#FFCA28",
      "#8D6E63",
      "#26A69A",
      "#5C6BC0",
      "#FF4081",
      "#FF9800",
      "#9C27B0",
      "#FFEB3B",
      "#42A5F5",
      "#8BC34A",
      "#F44336",
      "#795548",
    ];
    // Add more colors to the array if needed

    traces.push({
      x: xarr,
      y: yarr,
      text: xarr,
      textposition: "auto",
      mode: mode,
      text: "Sample Data",
      line: {
        shape: "spline",
        width: 2,
      },
      marker: {
        color: colors, // Assign colors array to the marker color property
        size: 18,
      },
      type: "scatter",
      hoverinfo: "x+y",
    });

    const layout = {
      ...LAYOUT,
      title: {
        text: title,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      xaxis: {
        title: {
          text: xatribute,
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
        tickfont: {
          family: "Arial",
          size: 12,
          color: "#777777",
        },
      },
      yaxis: {
        title: {
          text: yatribute.replace("_", " "),
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
        pad: 10,
        tickfont: {
          family: "Arial",
          size: 12,
          color: "#777777",
        },
      },

      plot_bgcolor: "rgb(250, 250, 250)",
      hovermode: "closest",
      margin: {
        r: 30,
      },
    };

    const result = { data: traces, layout: layout, config: CONFIG };
    return result;
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function dotPlot(data, title, mode = "markers") {
  scatterPlot(data, title, mode);
}

function areaOverlayPlot(data, title) {
  try {
    // Get the first object in the data array to extract the column names
    const firstObject = data[0];

    // Extract the column names using Object.keys()
    const columnNames = Object.keys(firstObject);

    // Store the column names in separate variables
    const xatribute = columnNames[0];
    const yatribute = columnNames[1];

    const xarr = [];
    const yarr = [];
    const traces = [];
    for (i in data) {
      xarr.push(data[i].map((item) => item[xatribute]));
      yarr.push(data[i].map((item) => item[yatribute]));
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
        title: xatribute,
      },
      yaxis: {
        title: yatribute,
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

function areaStackedPlot(data, title, groupnorm = "percent") {
  try {
    // Get the first object in the data array to extract the column names
    const firstObject = data[0];

    // Extract the column names using Object.keys()
    const columnNames = Object.keys(firstObject);

    // Store the column names in separate variables
    const xatribute = columnNames[0];
    const yatribute = columnNames[1];

    const xarr = [];
    const yarr = [];
    const traces = [];
    for (i in data) {
      xarr.push(data[i].map((item) => item[xatribute]));
      yarr.push(data[i].map((item) => item[yatribute]));
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
        title: xatribute,
      },
      yaxis: {
        title: yatribute,
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

function histogram(data, title, barmode = "overlay") {
  try {
    // Get the first object in the data array to extract the column names
    const firstObject = data[0];

    // Extract the column names using Object.keys()
    const columnNames = Object.keys(firstObject);

    // Store the column names in separate variables
    const xatribute = columnNames[0];

    const traces = [];
    let opacity = 0.5; // Adjust the opacity value as desired
    for (i in data) {
      traces.push({
        type: "histogram",
        name: `${i}`,
        autobinx: false,
        x: data[i][xatribute], // Update this line to use the column name
        marker: {
          color: "rgba(58, 125, 255, 0.7)", // Set the color for each histogram bar
        },
        opacity: opacity,
      });
      opacity -= 0.1; // Decrease the opacity for each subsequent histogram bar
    }
    const layout = {
      ...LAYOUT,
      title: {
        text: title,
        font: {
          family: "Arial",
          size: 16,
          color: "#777777",
        },
      },
      xaxis: {
        title: {
          text: xatribute,
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
      },
      yaxis: {
        title: {
          text: "Count",
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
        },
      },
      barmode: barmode,
      bargap: 0.1, // Adjust the gap between the histogram bars
      bargroupgap: 0.2, // Adjust the gap between groups of histogram bars
    };
    const result = { data: traces, layout: layout, config: CONFIG };
    return result;
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function table(data, title) {
  try {
    const firstObject = data[0];
    const columnNames = Object.keys(firstObject);

    const xAttribute = columnNames[0];
    const yAttribute = columnNames[1];
    const xArr = data.map((ele) => ele[xAttribute]);
    const yArr = data.map((ele) => ele[yAttribute]);

    const colors = [
      "#3386FF",
      "#33D9B2",
      "#FF59A3",
      "#FF7939",
      "#28C3FF",
      "#00B39A",
    ];

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const traces = [
      {
        type: "table",
        header: {
          values: columnNames,
          align: ["left", "center"], // Align column 1 to left and column 2 to center
          line: { width: 0.5, color: "#506784" },
          fill: { color: colors.map(() => randomColor()) }, // Randomly select a color from the colors array for each column
          font: { family: "Arial", size: 16, color: "white" },
        },
        cells: {
          values: [xArr, yArr],
          align: ["left", "center"], // Align column 1 to left and column 2 to center
          line: { color: ["#506784"], width: 0.5 },
          fill: { color: ["white"] },
          font: { family: "Arial", size: 15, color: ["#506784"] },
          height: 30,
          padding: 10,
        },
      },
    ];

    const result = {
      data: traces,
      layout: {
        ...LAYOUT,
        title: {
          text: title,
          font: {
            family: "Arial",
            size: 16,
            color: "#777777",
          },
          x: 0.5,
        },
      },
      config: { displayModeBar: false },
    };
    return result;
  } catch (error) {
    throw new Error(
      "Error in the table making function. Please check if the input or the layout are prepared properly."
    );
  }
}

let charts = new Map();
list_special_views = [
  "most_clicked_coffee_machines",
  "most_clicked_product",
  "category_views_per_month",
];

charts.set("most_clicked_coffee_machines", {
  bar_chart: process_x_bar_chart,
  bubble_chart: process_x_bubble_chart,
  pie_chart: pieChart,
  line_chart: lineChart,
  scatter_plot: scatterPlot,
});
charts.set("most_frequent_product_clicks_by_category", {
  pie_chart: pieChart,
  bar_chart: barChart,
  histogram: histogram,
});
charts.set("most_common_experience_type_for_sneakers", {
  pie_chart: pieChart,
  bar_chart: barChart,
  // bubble_chart: bubbleChart,
});
charts.set("top_ten_most_clicked_sneaker_brands", {
  bubble_chart: bubbleChart,
  bar_chart: process_x_bar_chart,
  pie_chart: pieChart,
  histogram: histogram,
});
charts.set("most_clicked_product", {
  bar_chart: barChart,
  bubble_chart: bubbleChart,
  pie_chart: pieChart,
  table: table,
});
charts.set("average_category_view_per_session", {
  bar_chart: barhChart,
});
charts.set("average_number_of_interactions_per_session", {
  bar_chart: barhChart,
});
charts.set("average_product_view_per_session", {
  bar_chart: barhChart,
});
charts.set("average_session_duration", {
  bar_chart: barhChart,
});
charts.set("average_session_duration_screenwise", {
  pie_chart: pieChart,
  bar_chart: barChart,
  bubble_chart: bubbleChart,
  line_chart: lineChart,
});
charts.set("average_time_spent_by_category", {
  pie_chart: pieChart,
  bar_chart: barChart,
  bubble_chart: bubbleChart,
});
charts.set("average_time_spent_on_experience", {
  pie_chart: pieChart,
  bar_chart: barChart,
});
charts.set("average_time_spent_on_product", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
  line_chart: lineChart,
});
charts.set("average_user_session_ended_per_session", {
  bar_chart: barhChart,
});
charts.set("average_user_session_started_per_session", {
  bar_chart: barhChart,
});
charts.set("average_website_started_per_session", {
  bar_chart: barhChart,
});
charts.set("avg_num_of_categories_viewed_per_session", {
  bar_chart: barhChart,
});
charts.set("avg_num_of_products_viewed_per_session", {
  bar_chart: barhChart,
});
charts.set("category_views_per_day", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  line_chart: lineChart,
  histogram: histogram,
});
charts.set("category_views_per_month", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  line_chart: lineChart,
  histogram: histogram,
});
charts.set("category_views_per_week", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  line_chart: lineChart,
  histogram: histogram,
});
charts.set("category_view_percentage", {
  bar_chart: barChart,
});
charts.set("coffee_machine_interest_by_country", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  line_chart: lineChart,
  histogram: histogram,
});
charts.set("coffee_machine_interest_by_power", {
  pie_chart: pieChart,
});
charts.set("coffee_machine_interest_by_pressure", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
});
charts.set("events_by_day_of_week", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  line_chart: lineChart,
  histogram: histogram,
  scatter_plot: scatterPlot,
});
charts.set("event_distribution_by_month", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
  line_chart: lineChart,
  histogram: histogram,
  scatter_plot: scatterPlot,
});
charts.set("event_distribution_by_week", {
  bar_chart: barChart,
  // pie_chart: pieChart,
  bubble_chart: bubbleChart,
  line_chart: lineChart,
  histogram: histogram,
  scatter_plot: scatterPlot,
});
charts.set("most_active_time_of_day_for_user_interactions", {
  line_chart: lineChart,
  histogram: histogram,
  table: table,
});
charts.set("most_clicked_coffee_machine_brands", {
  bar_chart: barChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
});
charts.set("most_clicked_coffee_machine_by_material", {
  pie_chart: pieChart,
  table: table,
});
charts.set("most_clicked_coffee_machine_by_price", {
  pie_chart: pieChart,
  histogram: histogram,
  bar_chart: barChart,
});
charts.set("most_clicked_sneakers_by_sole_type", {
  pie_chart: pieChart,
});
charts.set("most_clicked_sneaker_brands", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  // line_chart: lineChart,
  histogram: histogram,
  // scatter_plot: scatterPlot,
});
charts.set("most_clicked_sneaker_by_price", {
  bar_chart: barChart,
  pie_chart: pieChart,
  line_chart: lineChart,
});
charts.set("most_clicked_sneaker_vendors", {
  bubble_chart: process_x_bubble_chart,
  line_chart: lineChart,
  histogram: histogram,
});
charts.set("most_common_coffee_machine_capacities", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: process_x_bubble_chart,
  line_chart: lineChart,
});
charts.set("most_common_coffee_machine_color", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("most_common_coffee_machine_weights", {
  bar_chart: barChart,
  pie_chart: pieChart,
});
charts.set("most_common_day_category_view_event", {
  pie_chart: pieChart,
  line_chart: lineChart,
});
charts.set("most_common_day_product_view_event", {
  pie_chart: pieChart,
  line_chart: lineChart,
});
charts.set("most_common_day_session_ended_event", {
  pie_chart: pieChart,
  line_chart: lineChart,
});
charts.set("most_common_day_session_started_event", {
  pie_chart: pieChart,
  line_chart: lineChart,
});
charts.set("most_common_day_website_started", {
  pie_chart: pieChart,
  line_chart: lineChart,
});
charts.set("most_common_experience_type_for_coffee_machines", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
});
charts.set("most_popular_interaction_times", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
  line_chart: lineChart,
});
charts.set("percentage_user_session_event", {});
charts.set("percetange_product_views_events", {
  bar_chart: barhChart,
});
charts.set("percetange_user_session_ended_event", {});
charts.set("product_views_per_day", {
  line_chart: lineChart,
  bubble_chart: bubbleChart,
});
charts.set("product_views_per_month", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
});
charts.set("product_views_per_week", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
  histogram: histogram,
});
charts.set("time_of_day_category_view", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
  line_chart: lineChart,
  bubble_chart: bubbleChart,
});
charts.set("time_of_day_experience_started", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
  line_chart: lineChart,
  bubble_chart: bubbleChart,
});
charts.set("time_of_day_product_view", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
  line_chart: lineChart,
  bubble_chart: bubbleChart,
});
charts.set("time_of_day_session_ended", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
  line_chart: lineChart,
  bubble_chart: bubbleChart,
});
charts.set("time_of_day_session_started", {
  bar_chart: barChart,
  pie_chart: pieChart,
  histogram: histogram,
  line_chart: lineChart,
  bubble_chart: bubbleChart,
});
charts.set("time_spent_by_category", {
  bar_chart: barChart,
  pie_chart: pieChart,
});
charts.set("time_spent_on_experience", {});
charts.set("time_spent_on_product", {
  bar_chart: barChart,
  pie_chart: pieChart,
});
charts.set("top_coffee_machine_brands_per_vendor", {
  bubble_chart: process_x_bubble_chart,
});
charts.set("top_five_least_active_devices_screenwise", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("top_five_most_active_devices_screenwise", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("top_five_user_interest_coffee_machine_vendor", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("top_five_user_interest_sneaker_vendor", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("top_sneaker_brands_per_vendor", {
  bubble_chart: process_x_bubble_chart,
});
charts.set("top_ten_most_clicked_coffee_machine_brands", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("top_ten_most_clicked_coffee_machine_vendors", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("top_ten_most_clicked_sneaker_vendors", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("top_ten_most_popular_products_by_clicks", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("total_sessions", {
  bar_chart: barhChart,
});
charts.set("total_sessions_screenwise", {
  bar_chart: barChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("user_activity_peak_hour", {
  bar_chart: barChart,
  // pie_chart: pieChart,
  bubble_chart: bubbleChart,
  table: table,
});
charts.set("user_engagement_day_of_week", {
  line_chart: lineChart,
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
});
charts.set("user_preference_coffee_machine_type", {
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
  histogram: histogram,
  scatter_plot: scatterPlot,
});
charts.set("user_preference_color_coffee_machine", {
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
  histogram: histogram,
  scatter_plot: scatterPlot,
});
charts.set("user_preference_color_sneakers", {
  pie_chart: pieChart,
  bubble_chart: bubbleChart,
  histogram: histogram,
  scatter_plot: scatterPlot,
});
charts.set("user_preference_sneaker_type", {
  pie_chart: pieChart,
  table: table,
});
charts.set("user_sessions_ended_per_day", {
  line_chart: lineChart,
  bubble_chart: bubbleChart,
});
charts.set("user_sessions_ended_per_month", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
});
charts.set("user_sessions_ended_per_week", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
  histogram: histogram,
});
charts.set("user_sessions_per_day", {
  line_chart: lineChart,
  bubble_chart: bubbleChart,
  scatter_plot: scatterPlot,
});
charts.set("user_sessions_per_month", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
});
charts.set("user_sessions_per_week", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
});
charts.set("website_started_events_percentage_view", {});
charts.set("website_started_events_per_day_view", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
});
charts.set("website_started_events_per_month_view", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
});
charts.set("website_started_events_per_week_view", {
  line_chart: lineChart,
  bubble_chart: process_x_bubble_chart,
  scatter_plot: scatterPlot,
});

exports.create_chart = (data, viz_id, title_name, chart_type, callback) => {
  if (charts.has(viz_id)) {
    let chart = charts.get(viz_id);
    if (chart.hasOwnProperty(chart_type)) {
      if (list_special_views.includes(viz_id)) {
        let chartResult = chart[chart_type](data, title_name);

        callback(chartResult);
      } else {
        title = title_name;
        let chartResult = chart[chart_type](data, title);
        callback(chartResult);
      }
    } else {
      console.log("ERROR: Invalid Chart Type");
    }
  } else {
    console.log("ERROR: Invalid View");
  }
};
