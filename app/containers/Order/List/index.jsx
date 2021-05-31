import React, { memo, useState, useEffect, useCallback } from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Button,
  Input,
  Divider,
  Tag,
  Tooltip,
  Switch,
  Modal,
} from "antd";
import styled from "styled-components";
import classNames from "classnames";
import { array } from "prop-types";
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import _ from "lodash";
import * as style from "components/Variables";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
// import ModalCreate from "../Modal/index";
// import ModalUser from "../ModalUser/index";
const { confirm } = Modal;

const List = memo(
  ({
    className,
    setParams,
    data,
    params,
    row,
    setRow,
    arrKey,
    show,
    setShow,
    setVisible,
    visible,
    setLoading,
  }) => {
    const onSuccess = async (row) => {
      let result = await ServiceBase.requestJson({
        url: `/order/update-status`,
        method: "POST",
        data: { orders_id: row.orders_id, orders_status: 4 },
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
    const onCancel = async (row) => {
      let result = await ServiceBase.requestJson({
        url: `/order/update-status`,
        method: "POST",
        data: { orders_id: row.orders_id, orders_status: 3 },
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
    const columns = [
      {
        title: "STT",
        dataIndex: "key",
        key: "key",
        width: 60,
      },
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        width: 140,
        render: (value, row, index) => {
          const obj = {
            children: (
              <>
                <p>{value}</p>
                <p>{row.phone}</p>
              </>
            ),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
        width: 140,
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "product_name",
        key: "product_name",
        width: 120,
      },
      {
        title: "Hình ảnh",
        dataIndex: "product_image",
        key: "product_image",
        width: 160,
        render: (value, row, index) => {
          const obj = {
            children: <img src={value} width="100" height="100" />,
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Màu sắc",
        dataIndex: "color",
        key: "color",
        width: 90,
      },
      {
        title: "Kích cỡ",
        dataIndex: "size_name",
        key: "size_name",
        width: 80,
      },
      {
        title: "Giá bán",
        dataIndex: "product_price",
        key: "product_price",
        width: 120,
        render: (value, row, index) => {
          const obj = {
            children: value.toLocaleString(),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Số lượng",
        dataIndex: "orders_quantity",
        key: "orders_quantity",
        width: 100,
      },
      {
        title: "Trạng thái",
        dataIndex: "orders_status",
        key: "orders_status",
        width: 100,
        render: (value, row, index) => {
          if (value == 1) {
            const obj = {
              children: <p>Chờ xác nhận</p>,
              props: {},
            };
            return obj;
          } else if (value == 2) {
            const obj = {
              children: <p>Đã nhận</p>,
              props: {},
            };
            return obj;
          } else if (value == 3) {
            const obj = {
              children: <p>Đã hủy</p>,
              props: {},
            };
            return obj;
          } else {
            const obj = {
              children: <p>Đang giao</p>,
              props: {},
            };
            return obj;
          }
        },
      },
      {
        title: "Ngày mua",
        dataIndex: "created_at",
        key: "created_at",
        width: 100,
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
        dataIndex: "orders_status",
        key: "orders_status",
        fixed: "right",
        width: 120,
        render: (value, row, index) => {
          const obj = {
            children: value === 1 && (
              <>
                <Tooltip placement="topLeft" title="Hủy đơn hàng">
                  <button
                    className="btn"
                    style={{ marginRight: "10px" }}
                    onClick={() => onCancel(row)}
                  >
                    <CloseOutlined />
                  </button>
                </Tooltip>
                <Tooltip placement="topLeft" title="Xác nhận gửi hàng">
                  <button className="btn" onClick={() => onSuccess(row)}>
                    <CheckOutlined />
                  </button>
                </Tooltip>
              </>
            ),
            props: {},
          };
          return obj;
        },
      },
    ];
    return (
      <div
        gutter={15}
        className={classNames({
          [className]: true,
        })}
      >
        {/* {visible.isShow && (
          <ModalCreate
            visible={visible}
            setVisible={setVisible}
            setParams={setParams}
            setRow={setRow}
            row={row}
            data={data}
          />
        )}
        {visible.isShowModal && (
          <ModalUser
            visible={visible}
            setVisible={setVisible}
            setParams={setParams}
          />
        )} */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: "max-content", y: "calc(100vh - 300px)" }}
        />
      </div>
    );
  }
);

export default styled(List)``;
