import React, { memo, useState, useEffect } from "react";
import {
  Table,
  Switch,
  Tooltip,
  Modal,
  Space,
  Button,
  Input,
  Divider,
} from "antd";
import styled from "styled-components";
import classNames from "classnames";
import { array } from "prop-types";
import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Cell from "./Cell/index";
import moment from "moment";
import _ from "lodash";
import * as style from "components/Variables";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
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
  }) => {
    const onActive = (text, row, key) => {
      let name = "";
      if (row.active == 1) {
        name = "Bạn muốn bỏ active chiến dịch này không?";
      } else {
        name = "Bạn muốn active chiến dịch này không?";
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
    
    const onStatus = async (text, row, key) => {
      let id = row.id;
      let statuses = !row.active;
      let active = 0;
      switch (statuses) {
        case true:
          active = 1;
          break;
        case false:
          active = 0;
          break;
        default:
          break;
      }
      let result = await ServiceBase.requestJson({
        url: "/promotion/active",
        method: "GET",
        data: {
          id: id,
          active: active
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
    const onDelete = (row) => {
      confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn xóa chiến dịch này không?",
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
        url: `/promotion/delete`,
        method: "POST",
        data: { promotion_id: row.id },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess("Xóa chiến dịch thành công");
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
      }
    };
    const columns = [
      {
        title: "Tên chiến dịch",
        dataIndex: "body",
        key: "body",
        width: "450px",
      },
      {
        title: "Loại giảm giá",
        dataIndex: "type",
        key: "type",
        width: "150px",
        render: (text, row, key) => {
          const obj = {
            children: (
              text == 1 ? "%" : "Vnđ"
            ),
            props: {},
          };
          return obj;
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "active",
        key: "active",
        render: (text, row, key) => {
          const obj = {
            children: (
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={text}
                onChange={(e) => onActive(text, row, key)}
                checked={row.active}
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
      {
        title: "Action",
        key: "action",
        width: 100,
        render: (text, row) => (
          <div>
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
      />
    );
  }
);

export default styled(List)``;
