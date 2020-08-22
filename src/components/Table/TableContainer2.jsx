import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import StickyHeadTable from "./Table2";
import EnhancedTable from "./sortedTable";
import "./table.css";

const rows = [];
const columns = [
  { id: "country", label: "Country", minWidth: 100, textAlign: "right" },
  { id: "todayCases", label: "New Cases", minWidth: 100 },
  { id: "cases", label: "Total Cases", minWidth: 100 },
  { id: "deaths", label: "Total Deaths", minWidth: 100 },
  { id: "todayDeaths", label: "New Deaths", minWidth: 100 },
  { id: "todayRecovered", label: "New Recovered", minWidth: 100 },
  { id: "recovered", label: "Total Recovered", minWidth: 100 },
  { id: "active", label: "Active", minWidth: 100 },
  { id: "critical", label: "Critical", minWidth: 100 },
];

function createData(
  country,
  todayCases,
  cases,
  deaths,
  todayDeaths,
  todayRecovered,
  recovered,
  active,
  critical
) {
  return {
    country,
    todayCases,
    cases,
    deaths,
    todayDeaths,
    todayRecovered,
    recovered,
    active,
    critical,
  };
}

const TableContainer = () => {
  const [rows, setRows] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState("");

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((response) => {
          console.log(searchResult);
          console.log(response[0].country);
          if (searchResult) {
            const filteredData = response.filter((cty) =>
              cty.country.toLowerCase().includes(searchResult)
            );
            console.log(filteredData);
            setRows(filteredData);
          } else {
            setRows(response);
          }
          console.log(searchResult);
          console.log(rows);
        });
    };

    getCountriesData();
  }, [searchResult]);

  console.log(rows);

  return (
    <div className="main_table" style={{ maxHeight: 800, overflow: "scroll" }}>
      <input
        type="Search"
        placeholder="Search Country"
        onChange={(e) => setSearchResult(e.target.value)}
        className="table__search"
      />
      <EnhancedTable columns={columns} rows={rows} />
    </div>
  );
};

export default TableContainer;
