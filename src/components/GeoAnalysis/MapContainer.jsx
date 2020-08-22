import React, { useState, useEffect } from "react";
import "./mapcontainer.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const MapContainer = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

        countryCode === "worldwide" ? setMapZoom(3) : setMapZoom(4);
      });
  };

  return (
    <div className='leafletmap__container'>
      <div className='app__header'>
        <h1>Geographical Mapping</h1>
        <div className='leafletmap__subheader'>
          <span className='leafletmap__label'>
            Select any country to zoom-in
          </span>
          <FormControl className='leafletmap__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='app__stats'>
        <InfoBox
          onClick={(e) => setCasesType("cases")}
          title='Coronavirus Cases'
          isRed
          active={casesType === "cases"}
          cases={prettyPrintStat(countryInfo.todayCases)}
          total={numeral(countryInfo.cases).format("0.0a")}
        />
        <InfoBox
          onClick={(e) => setCasesType("recovered")}
          title='Recovered'
          active={casesType === "recovered"}
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          total={numeral(countryInfo.recovered).format("0.0a")}
        />
        <InfoBox
          onClick={(e) => setCasesType("deaths")}
          title='Deaths'
          isRed
          active={casesType === "deaths"}
          cases={prettyPrintStat(countryInfo.todayDeaths)}
          total={numeral(countryInfo.deaths).format("0.0a")}
        />
      </div>
      <Map
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
      />
    </div>
  );
};

export default MapContainer;
