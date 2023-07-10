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

  const xatribute = columnNames[0];
  const yatribute = columnNames[1];

  let xarr = [];
  let yarr = [];
  const traces = [];

  xarr = data.map((ele) => ele[xatribute]);
  yarr = data.map((ele) => ele[yatribute]);

  traces.push({
    x: orientation != "h" ? xarr : yarr,
    y: orientation != "h" ? yarr : xarr,
    type: "bar",
    orientation: orientation,
    hovertemplate: `%{x}:%{y}`,
    hoverinfo: "x+y",
  });
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
}

function barhChart(data, title = "", orientation = "h") {
  barChart(data, title, orientation);
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
  });

  const layout = {
    ...LAYOUT,
    barmode: "group",
    title: title,
    xaxis: {
      title: xatribute,
      tickangle: -30,
      tickfont: {
        size: 10,
      },
    },
    yaxis: {
      title: yatribute,
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

  traces.push({
    x: orientation != "h" ? xarr : yarr,
    y: orientation != "h" ? yarr : xarr,
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

  // console.log(traces);
  const layout = {
    ...LAYOUT,
    title: title,
    xaxis: {
      title: xatribute,
      tickangle: -30,
      tickfont: {
        size: 10,
      },
    },
    yaxis: {
      title: yatribute,
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
    traces.push({
      x: xarr,
      y: yarr,
      mode: mode,
      marker: {
        size: yarr.map((num) => Math.min(Math.max(15, Math.ceil(num / 5)), 40)),
      },
      sizemode: "area",
      hovertemplate: `%{x}:%{y}`,
      hoveron: "x+y",
    });

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
    // console.log("Arrays are", xarr, yarr);
    traces.push({
      labels: xarr,
      values: yarr,
      type: "pie",
      hoverinfo: "label+value",
      textinfo: "label+percent",
    });

    const layout = {
      ...LAYOUT,
      title: title,
      showlegend: false,
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
    // Get the first object in the data array to extract the column names
    const firstObject = data[0];

    // Extract the column names using Object.keys()
    const columnNames = Object.keys(firstObject);

    // Store the column names in separate variables
    const xatribute = columnNames[0];
    const yatribute = columnNames[1];

    let xarr = [];
    let yarr = [];
    const traces = [];

    xarr = data.map((ele) => ele[xatribute]);
    yarr = data.map((ele) => ele[yatribute]);
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
  } catch {
    throw new Error(
      "Error in the plot making function. Please check if the input or the layout are prepared properly."
    );
  }
}

function scatterPlot(data, title, mode = "markers") {
  try {
    // Get the first object in the data array to extract the column names
    const firstObject = data[0];

    // Extract the column names using Object.keys()
    const columnNames = Object.keys(firstObject);

    // Store the column names in separate variables
    const xatribute = columnNames[0];
    const yatribute = columnNames[1];

    let xarr = [];
    let yarr = [];
    const traces = [];
    // for (i in data) {
    xarr = data.map((ele) => ele[xatribute]);
    yarr = data.map((ele) => ele[yatribute]);
    // console.log("Arrays are", xarr, yarr);
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

    const layout = {
      ...LAYOUT,
      title: title,
      xaxis: {
        title: xatribute,
      },
      yaxis: {
        title: yatribute.replace("_", " "),
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
    let opacity = 0.1;
    for (i in data) {
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
        title: xatribute,
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
list_special_views = [
  "most_clicked_coffee_machines",
  "most_clicked_product",
  "category_views_per_month",
];

charts.set("most_clicked_coffee_machines", {
  bar_chart: process_x_bar_chart,
  bubble_chart: process_x_bubble_chart,
});
charts.set("most_frequent_product_clicks_by_category", {
  pie_chart: pieChart,
  bar_chart: barChart,
  bubble_chart: bubbleChart,
});
charts.set("most_common_experience_type_for_sneakers", {
  pie_chart: pieChart,
  bar_chart: barChart,
  bubble_chart: bubbleChart,
});
charts.set("top_ten_most_clicked_sneaker_brands", {
  bubble_chart: bubbleChart,
  bar_chart: barChart,
});
charts.set("most_clicked_product", {
  bar_chart: process_x_bar_chart,
  bubble_chart: process_x_bubble_chart,
});

charts.set("average_category_view_per_session", {
  // key_value: keyValue,
});

charts.set("average_number_of_interactions_per_session", {});
charts.set("average_product_view_per_session", {});
charts.set("average_session_duration", {});
charts.set("average_session_duration_screenwise", {
  pie_chart: pieChart,
});
charts.set("average_time_spent_by_category", {
  pie_chart: pieChart,
});
charts.set("average_time_spent_on_experience", {
  pie_chart: pieChart,
  bar_chart: barChart,
});
charts.set("average_time_spent_on_product", {
  bar_chart: barChart,
});
charts.set("average_user_session_ended_per_session", {});
charts.set("average_user_session_started_per_session", {});
charts.set("average_website_started_per_session", {});
charts.set("avg_num_of_categories_viewed_per_session", {});
charts.set("avg_num_of_products_viewed_per_session", {});
charts.set("category_views_per_day", {
  line_chart: lineChart,
});
charts.set("category_views_per_month", {
  bubble_chart: process_x_bubble_chart,
});
charts.set("category_views_per_week", {
  bubble_chart: process_x_bubble_chart,
});
charts.set("category_view_percentage", {});
charts.set("coffee_machine_interest_by_country", {
  bar_chart: barChart,
  bubble_chart: process_x_bubble_chart,
  pie_chart: pieChart,
});
charts.set("coffee_machine_interest_by_power", {});
charts.set("coffee_machine_interest_by_pressure", {});
charts.set("events_by_day_of_week", {
  line_chart: lineChart,
});
charts.set("event_distribution_by_month", {
  scatter_plot: scatterPlot,
});
charts.set("event_distribution_by_week", {
  scatter_plot: scatterPlot,
});
charts.set("most_active_time_of_day_for_user_interactions", {
  dot_plot: dotPlot,
  pie_chart: pieChart,
  bar_chart: barChart,
});
charts.set("most_clicked_coffee_machine_brands", {
  bar_chart: barChart,
  bubble_chart: process_x_bubble_chart,
});
charts.set("most_clicked_coffee_machine_by_material", {});
charts.set("most_clicked_coffee_machine_by_price", {});
charts.set("most_clicked_sneakers_by_sole_type", {});
charts.set("most_clicked_sneaker_brands", {});
charts.set("most_clicked_sneaker_by_price", {
  pie_chart: pieChart,
});
charts.set("most_clicked_sneaker_vendors", {
  bubble_chart: bubbleChart,
});
charts.set("most_common_coffee_machine_capacities", {});
charts.set("most_common_coffee_machine_color", {});
charts.set("most_common_coffee_machine_weights", {});
charts.set("most_common_day_category_view_event", {});
charts.set("most_common_day_product_view_event", {});
charts.set("most_common_day_session_ended_event", {});
charts.set("most_common_day_session_started_event", {});
charts.set("most_common_day_website_started", {});
charts.set("most_common_experience_type_for_coffee_machines", {});
charts.set("most_popular_interaction_times", {});
charts.set("percentage_user_session_event", {});
charts.set("percetange_product_views_events", {});
charts.set("percetange_user_session_ended_event", {});
charts.set("product_views_per_day", {
  scatter_plot: scatterPlot,
});
charts.set("product_views_per_month", {
  bubble_chart: bubbleChart,
});
charts.set("product_views_per_week", {});
charts.set("time_of_day_category_view", {});
charts.set("time_of_day_experience_started", {});
charts.set("time_of_day_product_view", {});
charts.set("time_of_day_session_ended", {});
charts.set("time_of_day_session_started", {});
charts.set("time_spent_by_category", {});
charts.set("time_spent_on_experience", {});
charts.set("time_spent_on_product", {});
charts.set("top_coffee_machine_brands_per_vendor", {});
charts.set("top_five_least_active_devices_screenwise", {
  pie_chart: pieChart,
});
charts.set("top_five_most_active_devices_screenwise", {});
charts.set("top_five_user_interest_coffee_machine_vendor", {});
charts.set("top_five_user_interest_sneaker_vendor", {});
charts.set("top_sneaker_brands_per_vendor", {});
charts.set("top_ten_most_clicked_coffee_machine_brands", {});
charts.set("top_ten_most_clicked_coffee_machine_vendors", {});
charts.set("top_ten_most_clicked_sneaker_vendors", {});
charts.set("top_ten_most_popular_products_by_clicks", {});
charts.set("total_sessions", {});
charts.set("total_sessions_screenwise", {});
charts.set("user_activity_peak_hour", {});
charts.set("user_engagement_day_of_week", {});
charts.set("user_preference_coffee_machine_type", {});
charts.set("user_preference_color_coffee_machine", {});
charts.set("user_preference_color_sneakers", {});
charts.set("user_preference_sneaker_type", {});
charts.set("user_sessions_ended_per_day", {});
charts.set("user_sessions_ended_per_month", {});
charts.set("user_sessions_ended_per_week", {});
charts.set("user_sessions_per_day", {});
charts.set("user_sessions_per_month", {});
charts.set("user_sessions_per_week", {});
charts.set("website_started_events_percentage_view", {});
charts.set("website_started_events_per_day_view", {});
charts.set("website_started_events_per_month_view", {});
charts.set("website_started_events_per_week_view", {});

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
