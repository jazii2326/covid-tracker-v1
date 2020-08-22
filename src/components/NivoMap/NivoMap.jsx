import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./world_countries.json";
//import MAP_DATA from "./data";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveChoropleth = ({ data, domainValue, colorScheme }) => {
  //const data = MAP_DATA;
  console.log(data);
  return (
    <ResponsiveChoropleth
      data={data}
      features={countries.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors={colorScheme}
      domain={[0, domainValue]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionTranslation={[0.55, 0.5]}
      projectionRotation={[0, 0, 0]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      projectionType="naturalEarth1"
      projectionScale="150"
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: "#444444",
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default MyResponsiveChoropleth;
