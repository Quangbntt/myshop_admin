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
import Pagination from "components/Paginate/index";
let time = null;

const index = memo(({}) => {
  const [loading, setLoading] = useState(false);
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
  const [dataBranch, setDataBranch] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [visible, setVisible] = useState({
    isShow: false,
    create: false,
    data: {},
  });
  const [visibleChild, setVisibleChild] = useState({
    isShow: false,
    create: false,
    data: {},
  });
  const [params, setParams] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
    trangThaiNT: undefined,
    product: undefined,
    category: undefined,
    sex: undefined,
    page: 0,
    size: 10,
  });
  const [show, setShow] = useState({
    showAll: false,
    arrKey: [],
  });
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    dataOld: [],
  });

  const boweload = useCallback(async () => {
    setLoading(true);
    let arrProduct = [];
    let arrCategory = [];
    _.map(params.product, (itemName, indexName) => {
      arrProduct.push(itemName.value);
    });
    _.map(params.category, (itemCategory, indexPhone) => {
      arrCategory.push(itemCategory.value);
    });
    let newParams = {
      // startDate: params.startDate,
      // endDate: params.endDate,
      product: arrProduct,
      category: arrCategory,
      page: params.page,
      limit: params.size,
      sex: params.sex,
    };
    let result = await ServiceBase.requestJson({
      url: "/product/list-admin",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.length"));
      let i = 1;
      let arrData = _.map(_.get(result, "value"), (item, index) => {
        item.key = i++;
        return item;
      });
      setData(arrData);
      let keyNew = [];
      _.map(arrData, (dataRes, index) => {
        keyNew.push(dataRes.key);
      });
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
    let branch = await ServiceBase.requestJson({
      url: "/branch/list",
      method: "GET",
      data: {},
    });
    if (branch.hasErrors) {
      Ui.showErrors(branch.errors);
      setLoading(false);
    } else {
      setLoading(false);
      let i = 0;
      let arrBranch = _.map(_.get(branch, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
      setDataBranch(arrBranch);
    }
    let category = await ServiceBase.requestJson({
      url: "/category/info",
      method: "GET",
      data: {},
    });
    if (category.hasErrors) {
      Ui.showErrors(category.errors);
      setLoading(false);
    } else {
      setLoading(false);
      let i = 0;
      let arrCategory = _.map(_.get(category, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
      setDataCategory(arrCategory);
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
                    dataBranch={dataBranch}
                    setDataBranch={setDataBranch}
                    dataCategory={dataCategory}
                    setDataCategory={setDataCategory}
                    visibleChild={visibleChild}
                    setVisibleChild={setVisibleChild}
                    setLoading={setLoading}
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
                  visibleChild={visibleChild}
                  setVisibleChild={setVisibleChild}
                  setRow={setRow}
                  params={params}
                  row={row}
                  show={show}
                  setShow={setShow}
                  arrKey={_.get(row, "arrKey")}
                />
                {/* <Pagination
                  params={params}
                  total={totalLength}
                  setParams={setParams}
                /> */}
              </CardContent>
            </Card>
          </Spin>
        </Paper>
      </Grid>
    </Grid>
  );
});
export default index;
