import { Row, Col } from "react-bootstrap";
import CardTrend from "../CardTrend/CardTrend";
import LineGraph from "../LineGraph/LineGraph";
import "./dailychart.css";

import React, { useState } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

const DailyChart = () => {
  const [noOfDays, setNoOfDays] = useState("400");

  const onCountryChange = (e) => {
    const noOfDaySelected = e.target.value;
    setNoOfDays(noOfDaySelected);
  };

  return (
    <div>
      <div className='dailyChart_header'>
        <span className='dailyChart_label'>Select No Of Days </span>
        <FormControl className='dailyChart_dropdown'>
          <Select
            variant='outlined'
            value={noOfDays}
            onChange={onCountryChange}
            style={{ maxHeight: "40px" }}
          >
            <MenuItem value='30'>30</MenuItem>
            <MenuItem value='60'>60</MenuItem>
            <MenuItem value='90'>90</MenuItem>
            <MenuItem value='120'>120</MenuItem>
            <MenuItem value='150'>150</MenuItem>
            <MenuItem value='200'>200</MenuItem>
            <MenuItem value='300'>300</MenuItem>
            <MenuItem value='400'>400</MenuItem>
            <MenuItem value='500'>500</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Row>
        <Col md={6}>
          <CardTrend
            statsIcon='fa fa-history'
            id='chartHours'
            title='Daily Covid Cases'
            category='Cases Per Day'
            stats='Updated 10 minutes ago'
            img_url='virus'
            content={
              <div className='ct-chart'>
                <LineGraph
                  className='app__graph'
                  casesType='cases'
                  lineCh_bgColor='rgba(38, 84, 124, 0.5)'
                  lineCh_brColor='#26547C'
                  noOfDays={noOfDays}
                />
              </div>
            }
          />
        </Col>
        <Col md={6}>
          <CardTrend
            statsIcon='fa fa-history'
            id='chartHours'
            title='Daily Deaths'
            category='Deaths Per Day'
            stats='Updated 10 minutes ago'
            img_url='death'
            content={
              <div className='ct-chart'>
                <LineGraph
                  className='app__graph'
                  casesType='deaths'
                  lineCh_bgColor='rgba(209, 73, 91, 0.5)'
                  lineCh_brColor='#D1495B'
                  noOfDays={noOfDays}
                />
              </div>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <CardTrend
            statsIcon='fa fa-history'
            id='chartHours'
            title='Daily Recovered Patients'
            category='24 Hours performance'
            stats='Updated 10 minutes ago'
            img_url='pat'
            content={
              <div className='ct-chart'>
                <LineGraph
                  className='app__graph'
                  casesType='recovered'
                  lineCh_bgColor='rgba(27, 153, 139, 0.5)'
                  lineCh_brColor='#1B998B'
                  noOfDays={noOfDays}
                />
              </div>
            }
          />
        </Col>
        <Col md={6}>
          <CardTrend
            statsIcon='fa fa-history'
            id='chartHours'
            title='Death Rate'
            category='Total Death / Total Recovered'
            stats='Updated 10 minutes ago'
            img_url='deathrate'
            content={
              <div className='ct-chart'>
                <LineGraph
                  className='app__graph'
                  casesType='cases'
                  deathRate
                  lineCh_bgColor='rgba(237, 174, 73, 0.5)'
                  lineCh_brColor='#EDAE49'
                  noOfDays={noOfDays}
                />
              </div>
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default DailyChart;
