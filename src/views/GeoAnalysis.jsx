import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import MapContainer from "../components/GeoAnalysis/MapContainer";
import NivoMapContainer from "../components/NivoMap/NivoMapContainer";

class TableList extends Component {
  render() {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <h3>
                <strong>Geographical Analysis</strong>
              </h3>
              <NivoMapContainer />
            </Col>

            <Col md={12}>
              <MapContainer />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
