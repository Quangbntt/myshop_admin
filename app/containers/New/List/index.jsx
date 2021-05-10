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
import ModalCreate from "../Modal/index";
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

    const onDelete = (row) => {
      confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn xóa tin  này không?",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk() {
          onDelteApi(row);
        },
        onCancel() {},
      });
    };
    const onDelteApi = async (row) => {
      let result = await ServiceBase.requestJson({
        url: `/news/delete`,
        method: "POST",
        data: { id: row.id },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess({ message: "Xóa tin tức thành công" });
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
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        width: 140,
      },
      {
        title: "Tóm tắt",
        dataIndex: "review",
        key: "review",
        width: 140,
      },
      {
        title: "Ảnh",
        dataIndex: "image",
        key: "image",
        width: 180,
        render: (text, row, key) => <img src={text} width="100" height="100" />,
      },
      {
        title: "Ngày tạo",
        key: "created_at",
        dataIndex: "created_at",
        width: 100,
      },
      {
        title: "Action",
        key: "action",
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
        {visible.type == "edit" && (
          <ModalCreate
            visible={visible}
            setVisible={setVisible}
            setParams={setParams}
            setRow={setRow}
            row={row}
            data={data}
          />
        )}

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
