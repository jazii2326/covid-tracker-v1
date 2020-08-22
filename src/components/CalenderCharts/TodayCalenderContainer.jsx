import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import TodayCasesCalendar from "./TodayCasesGraph";
import TodayDeathsCalendar from "./TodayDeathsGraph";
import TodayRecoveredCalendar from "./TodayRecoveredGraph";
import "./calender.css";

import { findMax, convertDate, buildChartData } from "./utils";

const TodayCalenderContainer = () => {
  const [country, setInputCountry] = useState("USA");
  const [countries, setCountries] = useState([]);
  const [todayCases, setTodayCases] = useState([]);
  const [todayDeaths, setTodayDeaths] = useState([]);
  const [todayRecovered, setTodayRecovered] = useState([]);
  const [maxCases, setMaxCases] = useState();
  const [maxDeaths, setMaxDeaths] = useState();
  const [maxRecovered, setMaxRecovered] = useState();

  useEffect(() => {
    const getCountryData = async () => {
      fetch("https://disease.sh/v3/covid-19/historical/USA?lastdays=400")
        .then((response) => response.json())
        .then((data) => {
          const dataForToday = data.timeline;
          //console.log("raw data for cases, deaths, recov", dataForToday); //Work from here
          const todayCasesCalenderData = buildChartData(dataForToday, "cases");
          //console.log("cases values for each day", todayCasesCalenderData);
          const formatedTodayCases = todayCasesCalenderData.map((data) => ({
            day: convertDate(data.x),
            value: data.y,
          }));
          setTodayCases(formatedTodayCases);
          const maxVal = findMax(formatedTodayCases);
          setMaxCases(maxVal);
          //console.log("formatted data for calender", formatedTodayCases);

          const todayDeathsCalenderData = buildChartData(
            dataForToday,
            "deaths"
          );
          //console.log("deaths values for each day", todayDeathsCalenderData);
          const formatedTodayDeaths = todayDeathsCalenderData.map((data) => ({
            day: convertDate(data.x),
            value: data.y,
          }));
          setTodayDeaths(formatedTodayDeaths);
          const maxValDeaths = findMax(formatedTodayDeaths);
          setMaxDeaths(maxValDeaths);

          const todayRecoveredCalenderData = buildChartData(
            dataForToday,
            "recovered"
          );
          //console.log("cases values for each day", todayCasesCalenderData);
          const formatedTodayRecovered = todayRecoveredCalenderData.map(
            (data) => ({
              day: convertDate(data.x),
              value: data.y,
            })
          );
          setTodayRecovered(formatedTodayRecovered);
          const maxValRecovered = findMax(formatedTodayRecovered);
          setMaxRecovered(maxValRecovered);
        });
    };

    getCountryData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    fetch(
      `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=400`
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message ===
          "Country not found or doesn't have any historical data"
        ) {
          alert("Doesn't have any historical data");
        } else {
          const dataForToday = data.timeline;
          //console.log("raw data for cases, deaths, recov", dataForToday); //Work from here
          const todayCasesCalenderData = buildChartData(dataForToday, "cases");
          //console.log("cases values for each day", todayCasesCalenderData);
          const formatedTodayCases = todayCasesCalenderData.map((data) => ({
            day: convertDate(data.x),
            value: data.y,
          }));
          setTodayCases(formatedTodayCases);
          const maxVal = findMax(formatedTodayCases);
          setMaxCases(maxVal);
          //console.log("formatted data for calender", formatedTodayCases);

          const todayDeathsCalenderData = buildChartData(
            dataForToday,
            "deaths"
          );
          //console.log("deaths values for each day", todayDeathsCalenderData);
          const formatedTodayDeaths = todayDeathsCalenderData.map((data) => ({
            day: convertDate(data.x),
            value: data.y,
          }));
          setTodayDeaths(formatedTodayDeaths);
          const maxValDeaths = findMax(formatedTodayDeaths);
          setMaxDeaths(maxValDeaths);

          const todayRecoveredCalenderData = buildChartData(
            dataForToday,
            "recovered"
          );
          //console.log("cases values for each day", todayCasesCalenderData);
          const formatedTodayRecovered = todayRecoveredCalenderData.map(
            (data) => ({
              day: convertDate(data.x),
              value: data.y,
            })
          );
          setTodayRecovered(formatedTodayRecovered);
          const maxValRecovered = findMax(formatedTodayRecovered);
          setMaxRecovered(maxValRecovered);

          setInputCountry(countryCode);
          //console.log(country);
        }
      });
  };

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

  console.log("These are today cases", todayCases, maxCases);

  console.log("These are today deaths", todayDeaths, maxDeaths);
  console.log("These are today recovered", todayRecovered, maxRecovered);

  return (
    <div className="calender__container">
      <div className="calender-header">
        <span className="piechart_label">Select Country </span>
        <FormControl className="calender__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
            className="calender__select"
          >
            <MenuItem value="USA">USA</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="calender__graphs">
        <div style={{ height: 250, marginBottom: 20, padding: 0 }}>
          <h5 className="calenderchart__title">
            Today COVID Cases - Per Day Distribution
          </h5>
          <TodayCasesCalendar data={todayCases} maxCases />
        </div>
        <hr />

        <div style={{ height: 250, marginBottom: 20, padding: 0 }}>
          <h5 className="calenderchart__title">
            Today COVID Deaths - Per Day Distribution
          </h5>
          <TodayDeathsCalendar data={todayDeaths} maxDeaths />
        </div>
        <hr />

        <div style={{ height: 250, marginBottom: 20, padding: 0 }}>
          <h5 className="calenderchart__title">
            Today COVID Recovered - Per Day Distribution
          </h5>
          <TodayRecoveredCalendar data={todayRecovered} maxRecovered />
        </div>
      </div>
    </div>
  );
};

export default TodayCalenderContainer;
