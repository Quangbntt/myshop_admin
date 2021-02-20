import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Select } from "antd";
import moment from "moment";
import { Grid, Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import _ from "lodash";
import Fillter from "./Fillter/index";
import List from "./List/index";
let time = null;

const index = memo(({}) => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    dataOld: [],
  });
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState({
    isShow :false,
    create:false
  });
  const [params, setParams] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
    name: undefined,
    page: 0,
    size: 10,
  });
  const [show, setShow] = useState({
    showAll: false,
    arrKey: [],
  });
  const [grid, setGrid] = useState({
    startDate: params.startDate.format("YYYY-MM-DD"),
    endDate: params.endDate.format("YYYY-MM-DD"),
    name: params.name,
    page: params.page,
    limit: params.size,
  });
  const boweload = useCallback(async () => {
    setLoading(true);
    let arrName = [];
    _.map(params.name, (itemName, indexName) => {
      arrName.push(itemName.key);
    });
    let newParams = {
      startDate: params.startDate,
      endDate: params.endDate,
      name: arrName,
      page: params.page,
      limit: params.size,
    };
    let result = await ServiceBase.requestJson({
      url: "/category/all",
      method: "GET",
      data: newParams,
      // data: "",
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.length"));
      let i = 100;
      let arrData = _.map(_.get(result, "value"), (item, index) => {
        item.key = i++;
        return item;
      });
      let keyNew = [];
      _.map(arrData, (dataRes, index) => {
        keyNew.push(dataRes.key);
      });
      setData(arrData);
      await setRow((preState) => {
        let nextState = { ...preState };
        nextState.arrKey = keyNew;
        nextState.data = arrData;
        return nextState;
      });
      await setShow((preState) => {
        let nextState = { ...preState };
        nextState.showAll = false;
        return nextState;
      });
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Spin spinning={loading} tip="Đang lấy dữ liệu...">
            <Card>
              <CardHeader
                className="cardHeader"
                title={
                  <Fillter
                    params={params}
                    setParams={setParams}
                    visible={visible}
                    setVisible={setVisible}
                    setRow={setRow}
                    row={row}
                    data={data}
                  />
                }
              />
              <CardContent>
                <List
                  data={data}
                  loading={loading}
                  grid={grid}
                  setParams={setParams}
                  totalLength={totalLength}
                  visible={visible}
                  setVisible={setVisible}
                  setRow={setRow}
                  params={params}
                  row={row}
                  show={show}
                  setShow={setShow}
                  arrKey={_.get(row, "arrKey")}
                />
              </CardContent>
            </Card>
          </Spin>
        </Paper>
      </Grid>
    </Grid>
  );
});
export default index;
