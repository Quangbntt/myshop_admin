import React, { memo, useCallback, useMemo, useEffect } from "react";
import { Row, Col, DatePicker, Button, Select } from "antd";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import * as style from "components/Variables";
import classNames from "classnames";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
import SelectMultiple from "components/SelectMultiple";
import { useHistory, useLocation } from "react-router-dom";
import ModalCreate from "../Modal/index";

const format = "DD/MM/YYYY";
const { RangePicker } = DatePicker;
const { Option } = Select;

const Fillter = memo(
  ({
    className,
    params,
    setParams,
    visible,
    setVisible,
    row,
    setRow,
    data,
    dataBranch,
    setDataBranch,
    visibleChild,
    setVisibleChild,
    dataCategory,
    setDataCategory,
    setLoading
  }) => {
    let history = useHistory();
    let location = useLocation();
    const getQuery = useCallback(
      (value, name) => {
        setParams((preState) => {
          let nextState = { ...preState };
          nextState[name] = value;
          return nextState;
        });
      },
      [params]
    );
    const onDate = (dates, dateStrings) => {
      if (_.isArray(dates)) {
        let dateTo = dates[0];
        let dateFrom = dates[1];
        getQuery(dateTo, "startDate");
        getQuery(dateFrom, "endDate");
      } else {
        let resetTo = moment().startOf("month");
        let resetFrom = moment().endOf("month");
        getQuery(resetTo, "startDate");
        getQuery(resetFrom, "endDate");
      }
    };
    const clearParams = () => {
      setParams((preState) => {
        let nextState = { ...preState };
        nextState.startDate = moment().startOf("month");
        nextState.endDate = moment().endOf("month");
        nextState.product = undefined;
        nextState.category = undefined;
        nextState.sex = undefined;
        nextState.page = 1;
        nextState.size = 10;
        return nextState;
      });
    };

    // const dateAt = moment(params.thang.format("YYYY-MM-DD"));

    // function xử lí phần push search lên url để copy link vẫn dc filter
    const pushQuery = useMemo(() => {
      let pathName = location.pathname;
      let pathFullName = [];
      let pathCategory = [];
      let pathSex = [];
      let pathEndDay = "";
      let pathStartDay = "";
      if (params.startDate) {
        pathStartDay = params.startDate
          ? moment(params.startDate).format("YYYY-MM-DD")
          : "";
      }
      if (params.endDate) {
        pathEndDay = params.endDate
          ? moment(params.endDate).format("YYYY-MM-DD")
          : "";
      }
      if (_.size(params.product) > 0) {
        pathFullName = JSON.stringify(params.product);
      }
      if (_.size(params.sex) > 0) {
        pathSex = JSON.stringify(params.sex);
      }
      if (_.size(params.category) > 0) {
        pathCategory = JSON.stringify(params.category);
      }
      history.push({
        pathname: pathName,
        search: `?start=${pathStartDay}&end=${pathEndDay}&name=${pathFullName}&category=${pathCategory}`,
      });
    }, [params]);
    // khi mới đầu vào thì sẽ set lại dữ liệu khi url có phần search
    useEffect(() => {
      pushQuery;
      const query = new URLSearchParams(location.search);
      const paramProduct = query.get("product");
      const paramCategory = query.get("category");
      const paramSex = query.get("sex");
      const paramStartDate = query.get("start");
      const paramEndDate = query.get("end");

      setParams((preState) => {
        let nextState = { ...preState };
        if (paramStartDate) {
          nextState.startDate = paramStartDate
            ? moment(paramStartDate)
            : moment();
        }
        if (paramEndDate) {
          nextState.endDate = paramEndDate ? moment(paramEndDate) : moment();
        }
        if (paramProduct) {
          nextState.product = JSON.parse(paramProduct);
        }
        if (paramSex) {
          nextState.sex = JSON.parse(paramSex);
        }
        if (paramCategory) {
          nextState.category = JSON.parse(paramCategory);
        }
        return nextState;
      });
    }, [pushQuery]);
    return (
      <div
        gutter={15}
        className={classNames({
          [className]: true,
        })}
      >
        <ModalCreate
          visible={visible}
          setVisible={setVisible}
          setRow={setRow}
          row={row}
          data={data}
          dataBranch={dataBranch}
          setDataBranch={setDataBranch}
          dataCategory={dataCategory}
          setDataCategory={setDataCategory}
          setLoading={setLoading}
          setParams={setParams}
        />
        <Row gutter={15}>
          <Col xl={6} lg={6} md={6} xs={6}>
            <RangePicker
              // disabledDate={disabledDate}
              value={[params.startDate, params.endDate]}
              ranges={{
                "Hôm nay": [moment(), moment()],
                "Cả tháng": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
                "Cả tuần": [moment(), moment().weekday(7)],
                "Tuần tới": [moment().weekday(7), moment().weekday(13)],
              }}
              format={format}
              onChange={(dates, dateStrings) => onDate(dates, dateStrings)}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} sm={4}>
            <SelectMultiple
              url="/product/list-name"
              placeholder="Tên sản phẩm"
              value={params.product}
              onChange={(value) => {
                let product = value;
                getQuery(product, "product");
              }}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} sm={4}>
            <SelectMultiple
              url="/category/getCategoryInfor"
              placeholder="Loại sản phẩm"
              value={params.category}
              onChange={(value) => {
                let category = value;
                getQuery(category, "category");
              }}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} sm={4}>
            <Select
              defaultValue="0"
              onChange={(value) => {
                let sex = value;
                getQuery(sex, "sex");
              }}
            >
              <Option value="0">Tất cả</Option>
              <Option value="1">Nữ</Option>
              <Option value="2">Nam</Option>
              <Option value="3">Unisex</Option>
            </Select>
          </Col>
          <Col className="clearParams" xxl={2} xl={2} lg={2} md={2} sm={2}>
            <Button
              type="primary"
              onClick={() => {
                setVisible((preState) => {
                  let nextState = { ...preState };
                  nextState.create = true;
                  nextState.isShow = true;
                  return nextState;
                });
              }}
            >
              Thêm mới
            </Button>
          </Col>
          <Col className="clearParams" xxl={2} xl={2} lg={2} md={2} sm={2}>
            <Button type="link" onClick={clearParams}>
              Xóa bộ lọc
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
);
export default styled(Fillter)`
  .buttonCustomer {
    .ant-btn {
      border-color: ${style.color.success.border};
      color: ${style.color.success.color};
      background: ${style.color.success.default};
    }
    .ant-btn :hover {
      color: ${style.color.success.colorHover};
      background: ${style.color.success.background};
    }
  }
  .buttonCustomerPush {
    .ant-btn {
      border-color: ${style.color.primary.border};
      color: ${style.color.primary.color};
      background: ${style.color.primary.default};
    }
    .ant-btn :hover {
      color: ${style.color.primary.colorHover};
      background: ${style.color.primary.background};
    }
  }
  .clearParams {
    text-align: right;
  }
`;
