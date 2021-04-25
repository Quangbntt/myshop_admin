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
  const [row, setRow] = useState("");
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState({
    isShow: false,
    isShowModal: false,
    type: "create",
    data: {},
  });
  const [params, setParams] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
    status: undefined,
    name: undefined,
    phone: undefined,
    page: 1,
    limit: 10,
  });
  const [show, setShow] = useState({
    showAll: false,
    arrKey: [],
  });
  const boweload = useCallback(async () => {
    setLoading(true);
    // let arrName = [];
    // let arrPhone = [];
    // _.map(params.name, (itemName, indexName) => {
    //   arrName.push(itemName.value);
    // });
    // _.map(params.phone, (itemPhone, indexPhone) => {
    //   arrPhone.push(itemPhone.value);
    // });
    let newParams = {
      startDate: params.startDate.format("YYYY-MM-DD"),
      endDate: params.endDate.format("YYYY-MM-DD"),
      name: params.name,
      phone: params.phone,
      status: params.status,
      page: params.page,
      size: params.limit,
    };
    let result = await ServiceBase.requestJson({
      url: "/user/all",
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
      let arrData = _.map(_.get(result, "value.data"), (item, index) => {
        item.key = i++;
        return item;
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
                  setLoading={setLoading}
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
