import React from "react";
import "./Chart.css";
import ChartBar from "./ChartBar";

function Chart(props) {
  const dpValues = props.dataPoints.map((d) => d.value);
  const totalMaximum = Math.max(...dpValues);
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => {
        return (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMaximum}
            label={dataPoint.label}
          ></ChartBar>
        );
      })}
    </div>
  );
}

export default Chart;
