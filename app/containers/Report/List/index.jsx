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

const List = memo(({ className, data, row }) => {
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <Pie data={row.data} />
    </div>
  );
});

export default styled(List)``;
