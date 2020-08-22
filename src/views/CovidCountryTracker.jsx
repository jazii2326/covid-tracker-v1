import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CalenderCountriesContainer from "../components/CalenderCharts/CalenderTotalContainer";
import TodayCalenderContainer from "../components/CalenderCharts/TodayCalenderContainer";
import PieChartForCountryContainer from "../components/PieChartForCountry/PieChartForCountryContainer";
import DailyChart from "../components/CountryLineGraph/DailyChartsForCountry";

import { Card, CardContent } from "@material-ui/core";

const CovidCountryTracker = () => {
  return (
    <div className='covidcountry__tracker'>
      <Grid fluid>
        <br />
        <Row>
          <Col md={12}>
            <Card>
              <CardContent>
                <TodayCalenderContainer />
              </CardContent>
            </Card>
          </Col>

          <Col md={12}>
            <Card>
              <CardContent>
                <CalenderCountriesContainer />
              </CardContent>
            </Card>
          </Col>
        </Row>
        <br />

        <Row>
          <Col md={12}>
            <PieChartForCountryContainer />
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <DailyChart />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default CovidCountryTracker;
