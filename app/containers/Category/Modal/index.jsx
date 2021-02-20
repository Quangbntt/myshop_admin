import React, { memo, useState, useEffect, useCallback } from "react";
import {
  Spin,
  Drawer,
  Button,
  Form,
  Input,
  Select,
  Modal,
  Row,
  Col,
  TimePicker,
  Switch,
} from "antd";
import _ from "lodash";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
const { Option } = Select;
const { TextArea } = Input;
const format = "HH:mm";
let time = null;
const ModalCreate = memo(({ visible, setVisible, setRow, row }) => {
  const [form] = Form.useForm();
  const [objForm, setObjForm] = useState({});
  const [status, setStatus] = useState(true);
  const handleOk = () => {
    setVisible((preState) => {
      let nextState = { ...preState };
      nextState.isShow = false;
      return nextState;
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setVisible((preState) => {
      let nextState = { ...preState };
      nextState.isShow = false;
      return nextState;
    });
  };
  const create = _.get(visible, "create", false);

  const onFinish = async (values) => {
    let params = {
      userName: values.userName,
      password: values.password,
      groupid: values.groupid,
      name: values.name,
      address: values.address,
      email: values.email,
      phone: values.phone,
      status: status,
    };
    let url = "";
    if (create) {
      url = "/catruc/taomoi";
    } else {
      url = "/catruc/capnhat";
    }
    let result = await ServiceBase.requestJson({
      url: url,
      method: "POST",
      data: params,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      let message = "";
      if (create) {
        message = "Tạo Mới Ca Thành Công";
      } else {
        message = "Sửa Mới Ca Thành Công";
      }
      Ui.showSuccess({ message: message });
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    }
  };
  const bowload = useCallback(async () => {
    let user = row;
    if (user) {
      setStatus(user.trangThai);
      let obj = {
        username: user.username,
        password: user.password,
        groupid: user.groupid,
        name: user.name,
        address: user.address,
        email: user.email,
        phone: user.phone,
        status: user.status,
      };
      form.setFieldsValue(obj);
    }
  }, [visible]);
  useEffect(() => {
    setTimeout(bowload, 0);
  }, [bowload]);
  const onStatus = (values) => {
    setStatus(values);
  };
  return (
    <Modal
      title="Quản lý tài khoản"
      visible={_.get(visible, "isShow")}
      onCancel={handleCancel}
      width="50%"
      destroyOnClose
      footer={[]}
    >
      <Form form={form} name="control-ref" onFinish={onFinish}>
        <Row gutter={15}>
          <Col md={12}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
            >
              <Input placeholder="Loại sản phẩm" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});
export default ModalCreate;
