import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
//import Calender_Data from "./data";
//import Calender_Data from "./data";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const TodayDeathsCalendar = ({ data, maxVal }) => {
  //data = Calender_Data;
  console.log(data);
  return (
    <ResponsiveCalendar
      data={data}
      from="2020-01-01"
      to="2020-12-30"
      emptyColor="#eeeeee"
      colors={[
        "#a8dadc",
        "#e9c46a",
        "#f4a261",
        "#e76f51",
        "#2a9d8f",
        "#264653",
        "#e63946",
      ]}
      margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
      yearSpacing={0}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      minValue={0}
      maxValue={maxVal}
      xFormat="time:%m/%d/%Y"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 35,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};

export default TodayDeathsCalendar;
