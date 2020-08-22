import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { Grid, Row, Col } from "react-bootstrap";

import PieChartForTotals from "./PieChartForTotals";
import PieChartForToday from "./PieChartForToday";
import "./piechartforcountry.css";

const PieChartForCountryContainer = () => {
  const [country, setInputCountry] = useState("USA");
  const [countries, setCountries] = useState([]);
  const [totalCaseDistState, setTotalCaseDistState] = useState([]);
  const [todayCaseDistState, setTodayCaseDistState] = useState([]);

  useEffect(() => {
    const getCountryData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries/USA")
        .then((response) => response.json())
        .then((data) => {
          const totalCaseDist = [
            {
              id: "cases",
              label: "Cases",
              value: data.cases,
              color: "hsl(37, 98%, 53%)",
            },
            {
              id: "deaths",
              label: "Deaths",
              value: data.deaths,
              color: "hsl(197, 37%, 24%)",
            },
            {
              id: "recovered",
              label: "Recovered",
              value: data.recovered,
              color: "hsl(197, 37%, 24%)",
            },
          ];
          setTotalCaseDistState(totalCaseDist);

          const todayCaseDist = [
            {
              id: "todayCases",
              label: "Cases Today",
              value: data.todayCases,
              color: "hsl(37, 98%, 53%)",
            },
            {
              id: "todayDeaths",
              label: "Deaths Today",
              value: data.todayDeaths,
              color: "hsl(197, 37%, 24%)",
            },
            {
              id: "todayRecovered",
              label: "Recovered Today",
              value: data.todayRecovered,
              color: "hsl(197, 37%, 24%)",
            },
          ];
          setTodayCaseDistState(todayCaseDist);
        });
    };

    getCountryData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const totalCaseDist = [
          {
            id: "cases",
            label: "Cases",
            value: data.cases,
            color: "hsl(37, 98%, 53%)",
          },
          {
            id: "deaths",
            label: "Deaths",
            value: data.deaths,
            color: "hsl(197, 37%, 24%)",
          },
          {
            id: "recovered",
            label: "Recovered",
            value: data.recovered,
            color: "hsl(197, 37%, 24%)",
          },
        ];
        setTotalCaseDistState(totalCaseDist);

        const todayCaseDist = [
          {
            id: "todayCases",
            label: "Cases Today",
            value: data.todayCases,
            color: "hsl(37, 98%, 53%)",
          },
          {
            id: "todayDeaths",
            label: "Deaths Today",
            value: data.todayDeaths,
            color: "hsl(197, 37%, 24%)",
          },
          {
            id: "todayRecovered",
            label: "Recovered Today",
            value: data.todayRecovered,
            color: "hsl(197, 34%, 24%)",
          },
        ];
        setTodayCaseDistState(todayCaseDist);

        setInputCountry(countryCode);
        //console.log(country);
        //}
      });
  };

  console.log("this is total case disct", totalCaseDistState);
  console.log("this is today case disct", todayCaseDistState);

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

  return (
    <div className="calender__container">
      <div className="countryPieChart__header">
        <span className="piechart_label">
          Select country for below Pie Chart:{" "}
        </span>
        <FormControl className="countryPieChart__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
            className="countryPieChart__select"
          >
            <MenuItem value="USA">USA</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Grid fluid>
        <Row>
          <Col lg={6} md={12}>
            <Card className="chart">
              <div className="pie__header">
                <div className="pie__image">
                  <img
                    src="https://i.ibb.co/zf8Sdqk/virus.png"
                    alt="icon"
                    className="pie__icon"
                  />
                </div>
                <div>
                  <h5 className="pie__title">Total Cases Count</h5>
                </div>
              </div>
              <div className="pie__chart" style={{ height: 400 }}>
                <PieChartForTotals data={totalCaseDistState} />
              </div>
            </Card>
          </Col>

          <Col lg={6} md={12}>
            <Card className="chart">
              <div className="pie__header">
                <div className="pie__image">
                  <img
                    src="https://i.ibb.co/RCNGsm8/patient.png"
                    alt="icon"
                    className="pie__icon"
                  />
                </div>
                <div>
                  <h5 className="pie__title">Today Cases Count</h5>
                </div>
              </div>
              <div className="pie__chart" style={{ height: 400 }}>
                <PieChartForToday data={todayCaseDistState} />
              </div>
            </Card>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default PieChartForCountryContainer;
