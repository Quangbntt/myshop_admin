import React, { memo, useState, useEffect, useCallback } from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Button,
  Tag,
  Input,
  Spin,
  Divider,
  Switch,
  Modal,
} from "antd";
import _ from "lodash";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  CloseOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import classNames from "classnames";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
import moment from "moment";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
let timer;
const Cell = memo(
  ({
    arrKey,
    data,
    className,
    arrConcat,
    params,
    setParams,
    dataMonth,
    dayOfMonth,
    show,
    setShow,
  }) => {
    let width = screen.width * 0.4;
    let cloneArrKey = _.cloneDeep(arrKey);
    const dropAll = () => {
      setShow((preState) => {
        let nextState = { ...preState };
        if (show.showAll) {
          nextState.arrKey = cloneArrKey;
        } else {
          nextState.arrKey = [];
        }
        nextState.showAll = !show.showAll;
        return nextState;
      });
    };
    const onStatus = async (text, row, key) => {
      let id = row.id;
      let statuses = !row.status;
      let status = 0;
      switch (statuses) {
        case true:
          status = 1;
          break;
        case false:
          status = 0;
          break;
        default:
          break;
      }
      let result = await ServiceBase.requestJson({
        url: "/category/changeStatus",
        method: "GET",
        data: {
          id: id,
          status: status,
        },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess({ message: _.get(result, "value.message") });
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
      }
    };
    const onChangeShow = (rows, record) => {
      let arrKeyNew = show.arrKey;
      let key = record.key;
      let fillter = _.filter(arrKeyNew, (i) => {
        return i === key;
      }).length;
      let index = _.findIndex(arrKeyNew, (o) => {
        return o == key;
      });
      if (fillter > 0) {
        arrKeyNew.splice(index, 1);
      } else {
        arrKeyNew.push(key);
      }
      setShow((preState) => {
        let nextState = { ...preState };
        nextState.arrKey = arrKeyNew;
        return nextState;
      });
    };
    const onActive = (text, row, key) => {
      let name = "";
      if (row.status == 1) {
        name = "Bạn muốn bỏ active dòng sản phẩm này không?";
      } else {
        name = "Bạn muốn active dòng sản phẩm này không?";
      }
      confirm({
        title: `Thông báo`,
        icon: <ExclamationCircleOutlined />,
        content: `${name}`,
        okText: "Có",
        cancelText: "Không",
        onOk() {
          onStatus(text, row, key);
        },
        onCancel() {},
      });
    };

    const expandedRowRender = (item, index) => {
      const columns = [
        {
          title: "Mã sản phẩm",
          dataIndex: "product_id",
          key: "product_id",
        },
        {
          title: "Tên sản phẩm",
          key: "id",
          render: (value, row, key) => {
            console.log(row);
            const obj = {
              children: row.promotion_product.product_name,
              props: {},
            };
            return obj;
          },
        },
        {
          title: "Hình ảnh",
          key: "promotion_id",
          render: (value, row, key) => {
            console.log(row);
            const obj = {
              children: (
                <img
                  src={row.promotion_product.product_image}
                  width="50"
                  height="50"
                />
              ),
              props: {},
            };
            return obj;
          },
        },
        {
          title: "Ngày tạo",
          dataIndex: "created_at",
          key: "created_at",
          render: (value, row, key) => {
            const obj = {
              children: moment(value).format("DD-MM-YYYY"),
              props: {},
            };
            return obj;
          },
        },
      ];
      const dataChild = [];
      _.map(item.promotion_detail, (dataItem, key) => {
        dataChild.push(dataItem);
      });
      return (
        <Table
          columns={columns}
          dataSource={dataChild}
          pagination={false}
          key={index}
          showHeader={true}
          className="table_small"
          bordered
        />
      );
    };
    useEffect(() => {
      setShow((preState) => {
        let nextState = { ...preState };
        nextState.arrKey = cloneArrKey;
        return nextState;
      });
    }, [arrKey]);
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <div className="customerIcon">
          <Button type="link">
            {show.showAll === false ? (
              <MinusSquareOutlined onClick={dropAll} />
            ) : (
              <PlusSquareOutlined onClick={dropAll} />
            )}
          </Button>
        </div>
        <Table
          className="components-table-demo-nested"
          rowClassName="driver_report"
          columns={arrConcat}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => record.sanPham !== "Tổng",
          }}
          expandRowByClick={true}
          onExpand={(rows, record) => onChangeShow(rows, record)}
          expandedRowKeys={show.arrKey}
          dataSource={data}
          scroll={{ x: "max-content", y: "calc(100vh - 300px)" }}
          bordered
          pagination={false}
        />
      </div>
    );
  }
);

export default styled(Cell)`
  .customerIcon {
    .anticon svg {
      color: #ffc20e;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .ant-btn {
      padding: unset;
    }
  }
  .customButton {
    border: 1px solid #19c719;
    box-shadow: 2px 2px #174c9c;
    margin-bottom: 5px;
    margin-top: -5px;
    color: #0c5a45;
  }
  .customButton svg {
    font-size: large;
  }
`;
