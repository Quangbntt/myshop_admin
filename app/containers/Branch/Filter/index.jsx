import React, { memo, useCallback, useMemo, useEffect } from "react";
import { Row, Col, DatePicker, Button, Select, Input } from "antd";
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
  }) => {
    let history = useHistory();
    let location = useLocation();
    const getQuery = useCallback(
      (value, name) => {
        setParams((preState) => {
          let nextState = { ...preState };
          nextState[`${name}`] = value;
          return nextState;
        });
      },
      [params]
    );
    
    const clearParams = () => {
      setParams((preState) => {
        let nextState = { ...preState };
        nextState.id = undefined;
        nextState.page = 1;
        nextState.size = 10;
        return nextState;
      });
    };

    // function xử lí phần push search lên url để copy link vẫn dc filter
    const pushQuery = useMemo(() => {
      let pathName = location.pathname;
      let pathId = [];
      
      if (_.size(params.id) > 0) {
        pathId = JSON.stringify(params.id);
      }
      history.push({
        pathname: pathName,
        search: `?id=${pathId}`,
      });
    }, [params]);
    // khi mới đầu vào thì sẽ set lại dữ liệu khi url có phần search
    useEffect(() => {
      pushQuery;
      const query = new URLSearchParams(location.search);
      const paramId = query.get("id");

      setParams((preState) => {
        let nextState = { ...preState };
        
        if (paramId) {
          nextState.id = JSON.parse(paramId);
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
          setParams={setParams}
        />
        <Row gutter={15}>
          <Col xxl={4} xl={4} lg={4} md={4} sm={4}>
            <SelectMultiple
              url="/branch/list-name"
              placeholder="Thương hiệu"
              value={params.id}
              onChange={(value) => {
                let id = value;
                getQuery(id, "id");
              }}
            />
          </Col>
          <Col className="clearParams" xxl={2} xl={2} lg={2} md={2} sm={2}>
            <Button
              type="primary"
              onClick={() => {
                setVisible((preState) => {
                  let nextState = { ...preState };
                  nextState.type = "create";
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
