import React, { memo, useState, useEffect, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  Row,
  Col,
  Switch,
  Upload,
} from "antd";
import _ from "lodash";
import {
  CloseOutlined,
  CheckOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import classNames from "classnames";
import styled from "styled-components";
let time = null;
const ModalUser = memo(
  ({
    visible,
    setVisible,
    setRow,
    row,
    data,
    setData,
    setParams,
    className,
  }) => {
    const [status, setStatus] = useState(true);
    const handleOk = () => {
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };
    const handleCancel = () => {
      //   form.resetFields();
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShowModal = false;
        return nextState;
      });
    };
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <Modal
          title={false}
          visible={_.get(visible, "isShowModal")}
          onCancel={handleCancel}
          width="30%"
          destroyOnClose
          footer={false}
          bodyStyle={{ padding: "0px" }}
        >
          <div
            style={{
              height: "200px",
              width: "100%",
              position: "relative",
            }}
          >
            <Row
              justify="space-between"
              align="bottom"
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <Col
                span={24}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    position: "absolute",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      zIndex: 4,
                      top: "0px",
                      margin: "auto",
                    }}
                  >
                    <img
                      src={_.get(visible, "data").background_image}
                      alt={_.get(visible, "data").name}
                      width="460.8px"
                      height="200px"
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    position: "absolute",
                    marginTop: "-6px",
                    bottom: "0px",
                  }}
                >
                  <div
                    style={{
                      width: "106px",
                      height: "106px",
                      borderRadius: "50%",
                      zIndex: 5,
                      background: "lightblue",
                      bottom: "0px",
                      margin: "auto",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    position: "absolute",
                    marginBottom: "3px",
                    bottom: "0px",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "#fff",
                      margin: "auto",
                      borderRadius: "50%",
                      zIndex: 10,
                    }}
                  >
                    <img
                      src={_.get(visible, "data").user_image}
                      alt={_.get(visible, "data").name}
                      width="100"
                      height="100"
                      style={{borderRadius: "50%"}}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="content" style={{width: "100%", height: "100px", paddingLeft: "20px", paddingTop: "10px"}}>
            <p className="test">
              <q>{_.get(visible, "data").about_me}</q>
            </p>
          </div>
        </Modal>
      </div>
    );
  }
);
export default styled(ModalUser)`
  .avatar {
    width: 100px;
    height: 100px;
    background: red;
  }
  .test {
    quotes: "\201C""\201D";
  }
`;
