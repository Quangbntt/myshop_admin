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
  Switch
} from "antd";
import styled from "styled-components";
import classNames from "classnames";
import { array } from "prop-types";
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  ExclamationCircleOutlined
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
    visible
  }) => {
    // const dataMonth = params.thang
    //   ? moment(params.thang, "YYYY-MM").daysInMonth()
    //   : "";
    // const dayOfMonth = params.thang.format("D");
    const onEdit = () => {
      setRow(row);
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = true;
        nextState.create = false;
        return nextState;
      });
    };
    const onStatus = async (e) => {
      let userId = row.id;
      console.log(row);
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
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Mã sản phẩm',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Content',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Image',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
            title: 'Khuyến mãi',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Giá',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số lượng',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Chất liệu',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'address',
            key: 'address',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Tooltip placement="topLeft" title="Sửa">
                <Button type="link" icon={<EditOutlined />} onClick={onEdit} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Xóa">
                <Button type="link" icon={<DeleteOutlined />} />
              </Tooltip>
            </Space>
          ),
        },
      ];
      
      
    return (
        <Table columns={columns} dataSource={data} scroll={{ x: "max-content", y: "calc(100vh - 300px)" }} />
    );
  }
);

export default styled(List)``;
