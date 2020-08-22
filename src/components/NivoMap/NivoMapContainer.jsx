import React, { useEffect, useState } from "react";
import MyResponsiveChoropleth from "./NivoMap";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./nivomap.css";

const NivoMapContainer = () => {
  const [countries, setCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [domainValue, setDomainValue] = useState(5000000);
  const [colorScheme, setColorScheme] = useState("YlOrRd");

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          if (casesType === "cases") {
            const count = data.map((country) => ({
              id: country.countryInfo.iso3,
              value: country.cases,
            }));
            setCountries(count);
            setDomainValue(200000);
            setColorScheme("YlOrRd");
          }
          if (casesType === "deaths") {
            const count = data.map((country) => ({
              id: country.countryInfo.iso3,
              value: country.deaths,
            }));
            setCountries(count);
            setDomainValue(20000);
            setColorScheme("YlOrRd");
          }
          if (casesType === "recovered") {
            const count = data.map((country) => ({
              id: country.countryInfo.iso3,
              value: country.recovered,
            }));
            setCountries(count);
            setDomainValue(100000);
            setColorScheme("greens");
          }

          console.log(casesType);
        });
    };

    getCountriesData();
  }, [casesType]);

  console.log(countries);

  const onCaseTypeChange = async (e) => {
    setCasesType(e.target.value);
  };

  return (
    <div className="nivomap__container">
      <Card>
        <CardContent>
          <div className="nivomap__header">
            <span className="nivomap__title">Select Type: </span>
            <FormControl className="nivomap__dropdown">
              <Select
                variant="outlined"
                value={casesType}
                onChange={onCaseTypeChange}
                className="nivomap__select"
              >
                <MenuItem value="cases">Cases</MenuItem>
                <MenuItem value="deaths">Deaths</MenuItem>
                <MenuItem value="recovered">Recovered</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ height: 400 }}>
            <MyResponsiveChoropleth
              data={countries}
              domainValue={domainValue}
              colorScheme={colorScheme}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NivoMapContainer;
