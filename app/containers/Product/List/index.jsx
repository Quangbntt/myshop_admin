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
  Tag,
  Tooltip,
  Switch,
  Rate,
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
const { Column, ColumnGroup } = Table;
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
    setVisible,
    visible,
  }) => {
    // const dataMonth = params.thang
    //   ? moment(params.thang, "YYYY-MM").daysInMonth()
    //   : "";
    // const dayOfMonth = params.thang.format("D");
    const onEdit = (row) => {
      // setRow(row);
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = true;
        nextState.create = false;
        nextState.data = row;
        return nextState;
      });
    };
    const onStatus = async (e) => {
      let userId = row.id;
      let maCa = row.maCa;
      let trangThai = row.trangThai;

      let text = trangThai == true ? "Không hoạt động" : "Đang hoạt động";
      let result = await ServiceBase.requestJson({
        url: `/catruc/trangthaica/${userId}`,
        method: "GET",
        data: {},
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        confirm({
          title: `Cập nhật trạng thái ${maCa} ${text}`,
          icon: <ExclamationCircleOutlined />,
          content: "Some descriptions",
          onOk() {
            setStatus(e);
          },
          onCancel() {},
        });
      }
    };
    const [status, setStatus] = useState(row.status);
    const columns = [
      {
        title: "STT",
        dataIndex: "key",
        key: "key",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "product_name",
        key: "product_name",
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
      },
      {
        title: "Giá bán",
        dataIndex: "product_price",
        key: "product_price",
        render: (value, row, index) => {
          const obj = {
            children: (
              value.toLocaleString()
            ),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Giá gốc",
        dataIndex: "product_promotion",
        key: "product_promotion",
        render: (value, row, index) => {
          const obj = {
            children: (
              value.toLocaleString()
            ),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Số lượng",
        dataIndex: "product_count",
        key: "product_count",
      },
      {
        title: "Màu sắc",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Kích cỡ",
        dataIndex: "size_name",
        key: "size_name",
      },
      {
        title: "Đánh giá",
        dataIndex: "product_rate",
        key: "product_rate",
        width: 180,
        render: (value, row, index) => {
          const obj = {
            children: (
              <Rate
                allowHalf
                defaultValue={value}
                disabled={true}
              />
            ),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "product_status",
        key: "product_status",
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
      },
      {
        title: "Giới tính",
        dataIndex: "sex",
        key: "sex",
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
        render: (text, row) => (
          <Space size="middle">
            <Tooltip placement="topLeft" title="Sửa">
              <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(row)} />
            </Tooltip>
            <Tooltip placement="topLeft" title="Xóa">
              <Button type="link" icon={<DeleteOutlined />} />
            </Tooltip>
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: "calc(100vh - 450px)" }}
        pagination={false}
      />
    );
  }
);

export default styled(List)``;
