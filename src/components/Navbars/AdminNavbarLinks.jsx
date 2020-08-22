import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav></Nav>
        <Nav pullRight></Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
