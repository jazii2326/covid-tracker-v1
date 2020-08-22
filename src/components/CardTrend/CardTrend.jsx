import React from "react";
import "./cardtrend.css";
import vir from "../../assets/img/faces/virus.png";
import pat from "../../assets/img/faces/patient.png";
import death from "../../assets/img/faces/toxic.png";
import deathrate from "../../assets/img/faces/chemistry.png";
import virus2 from "../../assets/img/faces/virus2.png";

const CardTrend = ({ ...props }) => (
  <div className={"card" + (props.plain ? " card-plain" : "")}>
    <div className={"header" + (props.hCenter ? " text-center" : "")}>
      <div className='card__header'>
        {props.img_url === "virus" ? (
          <img
            style={{ height: 35, width: 35, padding: 4, margin: 0 }}
            src={vir}
          />
        ) : props.img_url === "death" ? (
          <img
            style={{ height: 35, width: 35, padding: 4, margin: 0 }}
            src={death}
          />
        ) : props.img_url === "pat" ? (
          <img
            style={{ height: 35, width: 35, padding: 4, margin: 0 }}
            src={pat}
          />
        ) : props.img_url === "deathrate" ? (
          <img
            style={{ height: 35, width: 35, padding: 4, margin: 0 }}
            src={deathrate}
          />
        ) : props.img_url === "virus2" ? (
          <img
            style={{ height: 35, width: 35, padding: 4, margin: 0 }}
            src={virus2}
          />
        ) : null}

        <div>
          <h4 className='title'>{props.title}</h4>
          <p className='category'>{props.category}</p>
        </div>
      </div>
    </div>
    <div
      className={
        "content" +
        (props.ctAllIcons ? " all-icons" : "") +
        (props.ctTableFullWidth ? " table-full-width" : "") +
        (props.ctTableResponsive ? " table-responsive" : "") +
        (props.ctTableUpgrade ? " table-upgrade" : "")
      }
    >
      {props.content}

      <div className='footer'>
        {props.legend}
        {props.stats != null ? <hr /> : ""}
        <div className='stats'>
          <i className={props.statsIcon} /> {props.stats}
        </div>
      </div>
    </div>
  </div>
);

export default CardTrend;
