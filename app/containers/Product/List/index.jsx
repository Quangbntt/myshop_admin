import React, { memo, useState, useEffect } from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Button,
  Input,
  Divider,
  Tooltip,
  Tag,
  Rate,
  Modal
} from "antd";
import styled from "styled-components";
import classNames from "classnames";
import { array } from "prop-types";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import Cell from "./Cell/index";
import moment from "moment";
import ServiceBase from "utils/ServiceBase";
import _ from "lodash";
import * as style from "components/Variables";
import { Ui } from "utils/Ui";
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const arr = [];

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
    visible,
    setVisible,
    visibleChild,
    setVisibleChild,
    setLoading,
  }) => {
    const onEdit = (row) => {
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = true;
        nextState.type = "edit";
        nextState.data = row;
        return nextState;
      });
    };
    const onCreate = (row) => {
      setVisibleChild((preState) => {
        let nextState = { ...preState };
        nextState.isShow = true;
        nextState.type = "create";
        nextState.data = row;
        return nextState;
      });
    }
    const onDelete = (row) => {
      confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn xóa sản phẩm này không?",
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
        url: `/product/delete`,
        method: "POST",
        data: { product_id: row.product_id },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess('Xóa sản phẩm thành công');
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
        width: 70,
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "product_name",
        key: "product_name",
        width: 120,
      },
      {
        title: "Ảnh",
        dataIndex: "product_image",
        key: "product_image",
        width: 120,
        render: (value, row, index) => {
          const obj = {
            children: (
              <img
                src={value}
                alt="anh"
                key={index}
                width="100px"
                height="100px"
              />
            ),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Chất liệu",
        key: "product_material",
        dataIndex: "product_material",
        width: 100,
      },
      {
        title: "Giá bán",
        dataIndex: "product_price",
        key: "product_price",
        width: 100,
        render: (value, row, index) => {
          const obj = {
            children: value.toLocaleString(),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Giá gốc",
        dataIndex: "product_promotion",
        key: "product_promotion",
        width: 100,
        render: (value, row, index) => {
          const obj = {
            children: value.toLocaleString(),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Đánh giá",
        dataIndex: "product_rate",
        key: "product_rate",
        width: 170,
        render: (value, row, index) => {
          const obj = {
            children: <Rate allowHalf defaultValue={value} disabled={true} />,
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "product_status",
        key: "product_status",
        width: 75,
        render: (value, row, index) => {
          let color = value === 1 ? "green" : "red";
          let text = value === 1 ? "Còn hàng" : "Hết hàng";
          const obj = {
            children: (
              <Tag color={color} key={index}>
                {text.toUpperCase()}
              </Tag>
            ),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Lượt xem",
        dataIndex: "product_viewcount",
        key: "product_viewcount",
        width: 100,
      },
      {
        title: "Giới tính",
        dataIndex: "sex",
        key: "sex",
        width: 100,
        render: (value, row, index) => {
          let color = value === 1 ? "green" : "volcano";
          let text = value === 1 ? "Nữ" : "Nam";
          const obj = {
            children: (
              <Tag color={color} key={index}>
                {text.toUpperCase()}
              </Tag>
            ),
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
            <Tooltip placement="topLeft" title="Thêm mới">
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={() => onCreate(row)}
              />
            </Tooltip>
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
    let arrConcat = _.concat(columns, arr);
    return (
      <Cell
        data={data}
        arrKey={arrKey}
        arrConcat={arrConcat}
        params={params}
        setParams={setParams}
        show={show}
        setShow={setShow}
        visibleChild={visibleChild}
        setVisibleChild={setVisibleChild}
        setLoading={setLoading}
      />
    );
  }
);

export default styled(List)``;
