import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import DailyChart from "../components/DailyChart/DailyChart";
import HeaderStats from "../components/HeaderStats/HeaderStats";
import TableContainer from "../components/Table/TableContainer";
import TableContainer2 from "../components/Table/TableContainer2";
import PieChartContainer from "../components/PieChart/PieChartContainer";
import CaseDistPieContain from "../components/PieChart/CaseDistPieContain";

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
} from "variables/Variables.jsx";

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className='content' style={{ paddingTop: 0 }}>
        <Grid fluid>
          <br />
          <HeaderStats />
          <DailyChart />
          <Row>
            <Col md={6}>
              <CaseDistPieContain />
            </Col>
            <Col md={6}>
              <PieChartContainer />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <TableContainer2 />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
