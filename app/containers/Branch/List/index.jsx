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
const { Column, ColumnGroup } = Table;
const arr = [];
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
    const onEdit = (row) => {
      // setRow(row);
      setVisible((preState) => {
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
    const columns = [
      {
        title: "STT",
        dataIndex: "key",
        key: "key",
        width: 60,
      },
      {
        title: "Thương hiệu",
        dataIndex: "name",
        key: "name",
        width: 140,
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Ảnh đại diện",
        dataIndex: "image",
        key: "image",
        width: 120,
        render: (text, row, key) => <img src={text} width="100" height="60" />,
      },
      {
        title: "Loại",
        dataIndex: "type",
        key: "type",
        width: 140,
        render: (value, row, index) => {
          let color = value === 1 ? "green" : "red";
          let text = value === 1 ? "Đang hợp tác" : "Dừng hợp tác";
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
        title: "Ngày hợp tác",
        dataIndex: "created_at",
        key: "created_at",
        width: 140,
      },
      {
        title: "Thao tác",
        key: "stt",
        width: 100,
        render: (text, row) => (
          <Space size="middle">
            <Tooltip placement="topLeft" title="Sửa">
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={(e) => onEdit(row)}
              />
            </Tooltip>
            <Tooltip placement="topLeft" title="Xóa">
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(row)}
              />
            </Tooltip>
          </Space>
        ),
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
