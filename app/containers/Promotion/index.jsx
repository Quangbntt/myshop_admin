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
import Pagination from "components/Paginate/index";
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
    isShow: false,
    type: "create",
    data: {},
  });
  const [params, setParams] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
    page: 1,
    limit: 10,
  });
  const [show, setShow] = useState({
    showAll: false,
    arrKey: [],
  });
  const boweload = useCallback(async () => {
    setLoading(true);
    let newParams = {
      startDate: params.startDate.format("YYYY-MM-DD"),
      endDate: params.endDate.format("YYYY-MM-DD"),
      page: params.page,
      size: params.limit,
    };
    let result = await ServiceBase.requestJson({
      url: "/promotion/all",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.total"));
      let i = 1;
      let keyNew = [];
      let arrData = _.map(_.get(result, "value.data"), (item, index) => {
        item.key = i++;
        keyNew.push(item.key);
        return item;
      });
      await setRow((preState) => {
        let nextState = { ...preState };
        nextState.arrKey = keyNew;
        nextState.data = arrData;
        return nextState;
      });
      setData(arrData);
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
                <Pagination
                  params={params}
                  total={totalLength}
                  setParams={setParams}
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
