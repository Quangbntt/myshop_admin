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
// import ModalCreate from "../Modal/index";
const format = "DD/MM/YYYY";
const { RangePicker } = DatePicker;

const Fillter = memo(({ className, params, setParams, visible, setVisible, row, setRow, data }) => {
  let history = useHistory();
  let location = useLocation();
  const getQuery = useCallback(
    (value, name) => {
      setParams((preState) => {
        let nextState = { ...preState };
        nextState.name = value;
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
      nextState.name = undefined;
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
    if (_.size(params.name) > 0) {
      pathFullName = JSON.stringify(params.name);
    }
    history.push({
      pathname: pathName,
      search: `?start=${pathStartDay}&end=${pathEndDay}&name=${pathFullName}`,
    });
  }, [params]);
  // khi mới đầu vào thì sẽ set lại dữ liệu khi url có phần search
  useEffect(() => {
    pushQuery;
    const query = new URLSearchParams(location.search);
    const paramName = query.get("name");
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
      if (paramName) {
        nextState.name = JSON.parse(paramName);
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
      {/* <ModalCreate
          visible={visible}
          setVisible={setVisible}
          setRow={setRow}
          row={row}
          data={data}
        /> */}
      <Row gutter={15}>
      <Col xl={6} lg={6} md={6} xs={6}>
          <RangePicker
            // disabledDate={disabledDate}
            value={[params.startDate, params.endDate]}
            ranges={{
              "Hôm nay": [moment(), moment()],
              "Cả tháng": [moment().startOf("month"), moment().endOf("month")],
              "Cả tuần": [moment(), moment().weekday(7)],
              "Tuần tới": [moment().weekday(7), moment().weekday(13)],
            }}
            format={format}
            onChange={(dates, dateStrings) => onDate(dates, dateStrings)}
          />
        </Col>
        <Col xxl={4} xl={4} lg={4} md={4} sm={4}>
          <SelectMultiple
            url="/category/getCategoryInfor"
            placeholder="Loại sản phẩm"
            value={params.name}
            onChange={(value) => {
              let name = value;
              getQuery(name, "name");
            }}
          />
        </Col>
        {/* <Col className="clearParams" xxl={2} xl={2} lg={2} md={2} sm={2}>
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
        </Col> */}
        <Col className="clearParams" xxl={2} xl={2} lg={2} md={2} sm={2}>
          <Button type="link" onClick={clearParams}>
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </div>
  );
});
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
