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
import ModalUser from "../ModalUser/index";
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
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = true;
        nextState.type = "edit";
        nextState.data = row;
        return nextState;
      });
    };
    const onShow = (row) => {
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShowModal = true;
        nextState.type = "edit";
        nextState.data = row;
        return nextState;
      });
    }
    const onDelete = (row) => {
      confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn xóa nhóm này không?",
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
        url: `/user/delete`,
        method: "POST",
        data: { id: row.id },
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
        url: "/user/changeStatus",
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
    const onActive = (text, row, key) => {
      let name = "";
      if (row.status == 1) {
        name = "Bạn muốn bỏ active tài khoản này không?";
      } else {
        name = "Bạn muốn active tài khoản này không?";
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
    const columns = [
      {
        title: "STT",
        dataIndex: "key",
        key: "key",
        width: 60,
      },
      {
        title: "Tên đăng nhập",
        dataIndex: "username",
        key: "username",
        width: 140,

        render: (value, row, index) => {
          const obj = {
            children: <a onClick={() => onShow(row)}>{value}</a>,
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Chức vụ",
        dataIndex: "roles_name",
        key: "roles_id",
        width: 140,
      },
      {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
        width: 180,
      },
      {
        title: "Địa chỉ",
        key: "address",
        dataIndex: "address",
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 180,
      },
      {
        title: "Điện thoại",
        dataIndex: "phone",
        key: "phone",
        width: 120,
      },
      {
        title: "Trạng thái",
        dataIndex: "address",
        key: "address",
        width: 120,
        render: (text, row, key) => (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={text}
            onChange={(e) => onActive(text, row, key)}
            checked={row.status}
          />
        ),
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
        {visible.isShow && (
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
