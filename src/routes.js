/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import CovidCountryTracker from "views/CovidCountryTracker.jsx";
import GeoAnalysis from "views/GeoAnalysis.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Covid Live Tracker",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Covid Country Tracker",
    icon: "pe-7s-display1",
    component: CovidCountryTracker,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Geo Analysis",
    icon: "pe-7s-global",
    component: GeoAnalysis,
    layout: "/admin",
  },
];

export default dashboardRoutes;
