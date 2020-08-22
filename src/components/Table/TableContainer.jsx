import React from "react";
import ReactDOM from "react-dom";
import Table from "./Table3";

// const data = [
//   { param: "Admin", val: "0.03" },
//   { param: "Margin", val: "0.4" },
//   { param: "Price", val: "5080" }
// ];

const comonscol = [
  { title: "Country", field: "country" },
  { title: "New Cases", field: "todayCases" },
  { title: "Total Cases", field: "cases" },
  { title: "New Cases", field: "todayCases" },
  { title: "Total Deaths", field: "deaths" },
  { title: "New Deaths", field: "todayDeaths" },
  { title: "Total Recovered", field: "recovered" },
  { title: "New Recovered", field: "todayRecovered" },
  { title: "Active", field: "active" },
  { title: "Critical", field: "critical" },
];

const TableContainer =  () => {

  const [data, setData] = React.useState([])

  React.useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err.message))
  }, [])
  console.log(data);

  return (
    <div className="App">
      <Table col={comonscol} data={data} />
    </div>
  );
}

export default TableContainer;