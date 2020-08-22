import React, { useState, useEffect } from "react";
import MainStatsCard from "../MainStatsCard/MainStatsCard";
import { Row, Col } from "react-bootstrap";
import numeral from "numeral";

const HeaderStats = () => {
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const mildCases =
    parseInt(countryInfo.active) - parseInt(countryInfo.critical);
  const casesWithOutcome =
    parseInt(countryInfo.cases) - parseInt(countryInfo.active);

  const mildPercentage = parseInt(mildCases) / parseInt(countryInfo.active);
  const recoveredPercentage =
    parseInt(countryInfo.recovered) / parseInt(casesWithOutcome);
  const deathsPercentage =
    parseInt(countryInfo.deaths) / parseInt(casesWithOutcome);

  const criticalPercentage =
    parseInt(countryInfo.critical) / parseInt(countryInfo.active);
  console.log(criticalPercentage);

  const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

  return (
    <Row>
      <Col lg={3} md={6} sm={6} xs={12}>
        <MainStatsCard
          title="TOTAL ACTIVE CASES"
          cases1={numeral(countryInfo.active).format("0,0")}
          subheading1="Total infected patients"
          cases2={numeral(mildCases).format("0,0")}
          subheading2="in Mild condition"
          cases3={numeral(countryInfo.critical).format("0,0")}
          subheading3="Serious/Critical"
          imageUrl="https://i.ibb.co/GQsmvsc/cell.png"
          percentage1={numeral(mildPercentage).format("0%")}
          percentage2={numeral(criticalPercentage).format("0%")}
          isRed
          isGreen
        />
      </Col>
      <Col lg={3} md={6} sm={6} xs={12}>
        <MainStatsCard
          title="TOTAL CLOSED CASES"
          cases1={numeral(casesWithOutcome).format("0,0")}
          subheading1="Cases with an outcome"
          cases2={numeral(countryInfo.recovered).format("0,0")}
          subheading2="Recovered"
          cases3={numeral(countryInfo.deaths).format("0,0")}
          subheading3="Deaths"
          imageUrl="https://i.ibb.co/S5T920n/recovered.png"
          percentage1={numeral(recoveredPercentage).format("0%")}
          percentage2={numeral(deathsPercentage).format("0%")}
          isRed
          isGreen
        />
      </Col>
      <Col lg={3} md={6} sm={6} xs={12}>
        <MainStatsCard
          title="TODAY CASES"
          cases1={numeral(countryInfo.todayCases).format("0,0")}
          subheading1="Active cases"
          cases2={numeral(countryInfo.todayRecovered).format("0,0")}
          subheading2="Recovered cases"
          cases3={numeral(countryInfo.todayDeaths).format("0,0")}
          subheading3="Deaths"
          imageUrl="https://i.ibb.co/hKd6xQs/chemistry.png"
          isRed
          isGreen
        />
      </Col>
      <Col lg={3} md={6} sm={6} xs={12}>
        <MainStatsCard
          title="CASES PER 1 MILLION"
          cases1={numeral(countryInfo.casesPerOneMillion).format("0,0")}
          subheading1="Cases/1Mil"
          cases2={numeral(countryInfo.recoveredPerOneMillion).format("0,0")}
          subheading2="Recovered/1Mil"
          cases3={numeral(countryInfo.deathsPerOneMillion).format("0,0")}
          subheading3="Deaths/1Mil"
          imageUrl="https://i.ibb.co/RCNGsm8/patient.png"
          isRed
          isGreen
        />
      </Col>
    </Row>
  );
};

export default HeaderStats;
