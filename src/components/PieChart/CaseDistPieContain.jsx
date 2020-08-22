import React, { useEffect, useState } from "react";
import MyResponsivePie from "./CaseDistPie";
import "./casedistpiecont.css";
import Card from "@material-ui/core/Card";

const CaseDistPieContain = () => {
  const [severityDistState, setSeverityDistState] = useState([]);

  useEffect(() => {
    const getContinentData = () => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          const severityDist = [
            {
              id: "critical",
              label: "Critical",
              value: data.critical,
              color: "hsl(37, 98%, 53%)",
            },
            {
              id: "nonCritical",
              label: "Non-Critical",
              value: data.active - data.critical,
              color: "hsl(197, 37%, 24%)",
            },
          ];
          setSeverityDistState(severityDist);
        });
    };

    getContinentData();
  }, []);

  return (
    <Card className="chart">
      <div className="pie__header">
        <div className="pie__image">
          <img
            src="https://i.ibb.co/30J0jwY/man.png"
            alt="icon"
            className="pie__icon1"
          />
        </div>
        <div>
          <h5 className="pie__title">Case Severity Distribution </h5>
        </div>
      </div>
      <div className="pie__chart" style={{ height: 400 }}>
        <MyResponsivePie data={severityDistState} />
      </div>
    </Card>
  );
};

export default CaseDistPieContain;
