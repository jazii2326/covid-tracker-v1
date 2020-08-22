import React from "react";
import "./mainstatscard.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const MainStatsCard = ({
  cases1,
  cases2,
  cases3,
  title,
  subheading1,
  subheading2,
  subheading3,
  imageUrl,
  percentage1,
  percentage2,
  isRed,
  isGreen,
  ...props
}) => (
  <Card className="stats__card">
    <CardContent>
      <div className="stats___header">
        <img className="stats__imgage" src={imageUrl} alt="icon" />
        <h5 className="stats__title" style={{ marginTop: 5 }}>
          {title}
        </h5>
      </div>
      <hr />
      <div className="stats__cases">{cases1}</div>
      <div className="subheading">{subheading1}</div>

      <div className="left">
        <div>
          <span className={`cases1 ${isGreen ? "green" : ""}`}>{cases2}</span>
          {percentage1 ? <span className="percent">({percentage1})</span> : ""}
        </div>
        <div className="subheading">{subheading2}</div>
      </div>

      <div className="right">
        <div>
          <span className={`cases1 ${isRed ? "red" : ""}`}>{cases3} </span>
          {percentage2 ? <span className="percent">({percentage2})</span> : ""}
        </div>

        <div className="subheading">{subheading3}</div>
      </div>
    </CardContent>
  </Card>
);

export default MainStatsCard;
