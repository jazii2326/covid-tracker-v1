import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./calender.css";

import MyResponsiveCalendar from "./CalenderTotalCases";
import CalenderCountryDeaths from "./CalenderTotalDeaths";
import CalendarCountryRecovered from "./CalenderTotalRecovered";

import { findMax, convertDate } from "./utils";

const CalenderCountriesContainer = () => {
  const [country, setInputCountry] = useState("USA");
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [countryDeaths, setCountryDeaths] = useState([]);
  const [countryRecovered, setCountryRecovered] = useState([]);

  useEffect(() => {
    const getCountryData = async () => {
      fetch("https://disease.sh/v3/covid-19/historical/USA?lastdays=400")
        .then((response) => response.json())
        .then((data) => {
          const cases = data.timeline.cases;
          const dataArr = Object.keys(cases).map((key) => ({
            day: convertDate(key),
            value: cases[key],
          }));
          setCountryData(dataArr);

          const deaths = data.timeline.deaths;
          const dataArrDeaths = Object.keys(deaths).map((key) => ({
            day: convertDate(key),
            value: deaths[key],
          }));

          setCountryDeaths(dataArrDeaths);

          const recovered = data.timeline.recovered;
          const dataArrRecovered = Object.keys(recovered).map((key) => ({
            day: convertDate(key),
            value: recovered[key],
          }));

          setCountryRecovered(dataArrRecovered);
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
          const cases = data.timeline.cases;
          const dataArr = Object.keys(cases).map((key) => ({
            day: convertDate(key),
            value: cases[key],
          }));
          setInputCountry(countryCode);
          setCountryData(dataArr);
          console.log(countryCode, country, countryData);

          const maxValCases = findMax(dataArr);
          console.log(maxValCases);

          const deaths = data.timeline.deaths;
          const dataArrDeaths = Object.keys(deaths).map((key) => ({
            day: convertDate(key),
            value: deaths[key],
          }));

          setCountryDeaths(dataArrDeaths);

          const maxValDeaths = findMax(dataArrDeaths);
          console.log(maxValDeaths);

          const recovered = data.timeline.recovered;
          const dataArrRecovered = Object.keys(recovered).map((key) => ({
            day: convertDate(key),
            value: recovered[key],
          }));

          setCountryRecovered(dataArrRecovered);
          const maxValRecovered = findMax(dataArrRecovered);
          console.log(maxValRecovered);
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

  return (
    <div className="calender__container">
      <div className="calender__header">
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
        <div style={{ height: 250, marginBottom: 60 }}>
          <h5 className="calenderchart__title">
            Total COVID Cases - Per Day Distribution
          </h5>
          <MyResponsiveCalendar data={countryData} maxValCases />
        </div>
        <hr />

        <div style={{ height: 250, marginBottom: 60 }}>
          <h5 className="calenderchart__title">
            Total COVID Deaths - Per Day Distribution
          </h5>
          <CalenderCountryDeaths data={countryDeaths} maxValDeaths />
        </div>
        <hr />

        <div style={{ height: 250, marginBottom: 60 }}>
          <h5 className="calenderchart__title">
            Total COVID Recovered - Per Day Distribution
          </h5>
          <CalendarCountryRecovered data={countryRecovered} maxValRecovered />
        </div>
      </div>
    </div>
  );
};

export default CalenderCountriesContainer;
