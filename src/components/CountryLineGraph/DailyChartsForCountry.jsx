import { Row, Col } from "react-bootstrap";
import CardTrend from "../CardTrend/CardTrend";
import LineGraph from "./CountryLineGraphForToday";
import LineGraphForTotal from "./CountryLineGraphForTotal";
import "./linegraph.css";

import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

const DailyChart = () => {
  const [country, setInputCountry] = useState("USA");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setInputCountry(countryCode);
  };

  console.log(country);

  return (
    <div>
      <div className="dailyChart_header">
        <span className="dailyChart_label">Select Country </span>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="USA">USA</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Row>
        <Col md={6}>
          <Row>
            <Col md={12}>
              <CardTrend
                statsIcon="fa fa-history"
                id="chartHours"
                title="Daily Covid Cases"
                category="Cases Per Day"
                stats="Updated 10 minutes ago"
                img_url="virus2"
                content={
                  <div className="ct-chart">
                    <LineGraph
                      className="app__graph"
                      casesType="cases"
                      lineCh_bgColor="rgba(38, 84, 124, 0.5)"
                      lineCh_brColor="#26547C"
                      countryCode={country}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CardTrend
                statsIcon="fa fa-history"
                id="chartHours"
                title="Daily Deaths"
                category="Deaths Per Day"
                stats="Updated 10 minutes ago"
                img_url="death"
                content={
                  <div className="ct-chart">
                    <LineGraph
                      className="app__graph"
                      casesType="deaths"
                      lineCh_bgColor="rgba(209, 73, 91, 0.5)"
                      lineCh_brColor="#D1495B"
                      countryCode={country}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CardTrend
                statsIcon="fa fa-history"
                id="chartHours"
                title="Daily Recovered Patients"
                category="Recovered Per Day"
                stats="Updated 10 minutes ago"
                img_url="pat"
                content={
                  <div className="ct-chart">
                    <LineGraph
                      className="app__graph"
                      casesType="recovered"
                      lineCh_bgColor="rgba(27, 153, 139, 0.5)"
                      lineCh_brColor="#1B998B"
                      countryCode={country}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={12}>
              <CardTrend
                statsIcon="fa fa-history"
                id="chartHours"
                title="Total Covid Cases"
                category="Cumulative Sum"
                stats="Updated 10 minutes ago"
                img_url="virus2"
                content={
                  <div className="ct-chart">
                    <LineGraphForTotal
                      className="app__graph"
                      casesType="cases"
                      lineCh_bgColor="rgba(38, 84, 124, 0.5)"
                      lineCh_brColor="#26547C"
                      countryCode={country}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CardTrend
                statsIcon="fa fa-history"
                id="chartHours"
                title="Total Deaths"
                category="Cumulative Sum"
                stats="Updated 10 minutes ago"
                img_url="death"
                content={
                  <div className="ct-chart">
                    <LineGraphForTotal
                      className="app__graph"
                      casesType="deaths"
                      lineCh_bgColor="rgba(209, 73, 91, 0.5)"
                      lineCh_brColor="#D1495B"
                      countryCode={country}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CardTrend
                statsIcon="fa fa-history"
                id="chartHours"
                title="Total Recovered Patients"
                category="Cumulative Sum"
                stats="Updated 10 minutes ago"
                img_url="pat"
                content={
                  <div className="ct-chart">
                    <LineGraphForTotal
                      className="app__graph"
                      casesType="recovered"
                      lineCh_bgColor="rgba(27, 153, 139, 0.5)"
                      lineCh_brColor="#1B998B"
                      countryCode={country}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DailyChart;
