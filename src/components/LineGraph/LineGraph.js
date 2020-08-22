import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./linegraph.css";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildDeathRate = (data) => {
  let chartData1 = [];
  for (let date in data.cases) {
    let newDataPoint = {
      x: date,
      y: (data["deaths"][date] / data["recovered"][date]) * 100,
    };
    chartData1.push(newDataPoint);
  }
  console.log(chartData1);
  return chartData1;
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, noOfDays, ...props }) {
  const [data, setData] = useState({});
  console.log(props);
  useEffect(() => {
    if (props.deathRate) {
      const fetchData = async () => {
        await fetch(
          `https://disease.sh/v3/covid-19/historical/all?lastdays=${noOfDays}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let chartData = buildDeathRate(data, casesType);
            setData(chartData);
            console.log(chartData);
            // buildChart(chartData);
          });
      };

      fetchData();
    } else {
      const fetchData = async () => {
        await fetch(
          `https://disease.sh/v3/covid-19/historical/all?lastdays=${noOfDays}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let chartData = buildChartData(data, casesType);
            setData(chartData);
            console.log(chartData);
            // buildChart(chartData);
          });
      };

      fetchData();
    }
  }, [casesType, noOfDays]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: `${props.lineCh_bgColor}`,
                borderColor: `${props.lineCh_brColor}`,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
