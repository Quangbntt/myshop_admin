import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useSelector,
} from "react";
import styled from "styled-components";
import classNames from "classnames";
import _ from "lodash";
import * as style from "components/Variables";
import { Pie, Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const Chart = memo(({ className, dataBar, setDataBar }) => {
    console.log(dataBar);
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <Bar data={dataBar.data} options={config} />
    </div>
  );
});

export default styled(Chart)``;
