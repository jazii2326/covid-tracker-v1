export const buildChartData = (data, casesTypes) => {
  console.log(data);
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesTypes][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesTypes][date];
  }
  return chartData;
};

export function convertDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function findMax(array) {
  return Math.max.apply(
    Math,
    array.map(function (o) {
      return o.value;
    })
  );
}
