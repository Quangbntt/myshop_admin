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
} from "antd";
import styled from "styled-components";
import classNames from "classnames";
import { array } from "prop-types";
import { DownOutlined } from "@ant-design/icons";
import Cell from "./Cell/index";
import moment from "moment";
import _ from "lodash";
import * as style from "components/Variables";
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
  }) => {
    const columns = [
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "id",
        width: "450px",
        render: (text, row, key) => {
          let proLength = row.product.length;
          const obj = {
            children: (
              text + " (" + `${proLength} loại sản phẩm` + ")"
            ),
            props: {},
          };
          return obj;
        },
      },
      { title: "Hiển thị", dataIndex: "", key: "displayorder", width: "350px" },
      { title: "Trạng thái", dataIndex: "", key: "key" },
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
