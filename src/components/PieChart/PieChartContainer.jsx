import React, { useEffect, useState } from "react";
import MyResponsivePie from "./PieChart";
import "./piechartcontainer.css";
import Card from "@material-ui/core/Card";

const PieChartContainer = () => {
  const [continents, setcontinents] = useState([]);

  const continentColors = {
    "North America": "hsl(197, 37%, 24%)",
    "South America": "hsl(197, 37%, 24%)",
    Asia: "hsl(0, 0%, 0%)",
    Europe: "hsl(197, 37%, 24%)",
    Africa: "hsl(197, 37%, 24%)",
    "Australia/Oceania": "hsl(197, 37%, 24%)",
  };

  useEffect(() => {
    const getContinentData = () => {
      fetch("https://disease.sh/v3/covid-19/continents")
        .then((response) => response.json())
        .then((data) => {
          const continents = data.map((cont) => ({
            id: cont.continent,
            label: cont.continent,
            value: cont.cases,
            color: continentColors[cont["continent"]],
          }));

          setcontinents(continents);
        });
    };

    getContinentData();
  }, []);

  return (
    <Card className="chart">
      <div className="pie__header">
        <div className="pie__image">
          <img
            src="https://i.ibb.co/HpkJcDT/globe.png"
            alt="icon"
            className="pie__icon"
          />
        </div>
        <div>
          <h5 className="pie__title">Case Count Per Continent</h5>
        </div>
      </div>
      <div className="pie__chart" style={{ height: 400 }}>
        <MyResponsivePie data={continents} />
      </div>
    </Card>
  );
};

export default PieChartContainer;
