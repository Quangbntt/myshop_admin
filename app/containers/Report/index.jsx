import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Select, Col, Row } from "antd";
import moment from "moment";
import { Grid, Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import _ from "lodash";
import Pagination from "components/Paginate/index";
import Fillter from "./Fillter/index";
import List from "./List/index";
import Chart from "./Chart/index";
let time = null;

const index = memo(({ className }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [row, setRow] = useState([]);
  const [params, setParams] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
  const boweload = useCallback(async () => {
    setLoading(true);
    let newParams = {
      startDate: params.startDate.format("YYYY-MM-DD"),
      endDate: params.endDate.format("YYYY-MM-DD"),
    };
    let result = await ServiceBase.requestJson({
      url: "/order/report",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      let arrData = _.map(_.get(result, "value.data"), (item, index) => {
        return item;
      });
      setData(arrData);
      setRow(_.get(result, "value"));
    }
    let resultBar = await ServiceBase.requestJson({
      url: "/order/report-bar",
      method: "GET",
      data: newParams,
    });
    if (resultBar.hasErrors) {
      Ui.showErrors(resultBar.errors);
    } else {
      setDataBar(_.get(resultBar, "value"));
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <Spin
        spinning={loading}
        tip="Đang lấy dữ liệu..."
        style={{ width: "50%", height: "50%" }}
      >
        <Fillter params={params} setParams={setParams} data={data} />
        <Row>
          <Col md={12}>
            {row.code == 200 && (
              <List
                className="list"
                data={data}
                loading={loading}
                setParams={setParams}
                params={params}
                row={row}
              />
            )}
          </Col>
          <Col md={12}>
            {dataBar.code == 200 && (
              <Chart
                className="list"
                loading={loading}
                setParams={setParams}
                params={params}
                dataBar={dataBar}
                setDataBar={setDataBar}
              />
            )}
          </Col>
        </Row>
      </Spin>
    </div>
  );
});
export default styled(index)`
  // .list {
  //   width: 100%;
  //   height: 100%;
  // }
`;
