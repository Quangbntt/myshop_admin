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
  Tooltip,
} from "antd";
import _ from "lodash";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  CloseOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
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
    show,
    setShow,
    visibleChild,
    setVisibleChild,
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

    const onEdit = (row) => {
      // setRow(row);
      setVisibleChild((preState) => {
        let nextState = { ...preState };
        nextState.isShow = true;
        nextState.type = "edit";
        nextState.data = row;
        return nextState;
      });
    };
    const onDelete = (row) => {
      confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn xóa thương hiệu này không?",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk() {
          onDelteApi(row);
        },
        onCancel() {},
      });
    };
    const onDelteApi = async (row) => {
      setLoading(true);
      let result = await ServiceBase.requestJson({
        url: `/branch/delete`,
        method: "POST",
        data: { branches_id: row.id },
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

    const expandedRowRender = (item, index) => {
      const columns = [
        {
          title: "Mã sản phẩm",
          dataIndex: "id",
          key: "id",
          width: 120,
        },
        {
          title: "Màu sắc",
          dataIndex: "color",
          key: "color",
          width: 120,
        },
        {
          title: "Kích cỡ",
          dataIndex: "size_name",
          key: "size_name",
          width: 120,
        },
        {
          title: "Số lượng",
          dataIndex: "product_count",
          key: "product_count",
          width: 120,
        },
        {
          title: "Ngày nhập",
          dataIndex: "created_at",
          key: "created_at",
          width: 120,
          render: (value, row, index) => {
            const obj = {
              children: moment(value).format("DD-MM-YYYY"),
              props: {},
            };
            return obj;
          },
        },
        {
          title: "Action",
          key: "action",
          width: 100,
          render: (text, row) => (
            <div>
              <Tooltip placement="topLeft" title="Sửa">
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(row)}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title="Xóa">
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(row)}
                />
              </Tooltip>
            </div>
          ),
        },
      ];
      const dataChild = [];
      _.map(item.product, (dataItem, key) => {
        dataChild.push(dataItem);
      });
      return (
        <Table
          columns={columns}
          dataSource={dataChild}
          pagination={false}
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
  th.ant-table-cell {
    background: rgb(102 76 137);
    color: #fff;
  }
`;
