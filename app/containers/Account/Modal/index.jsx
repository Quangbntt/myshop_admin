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
  Upload,
} from "antd";
import _ from "lodash";
import { CloseOutlined, CheckOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
const { Option } = Select;
const { TextArea } = Input;
const format = "HH:mm";
let time = null;
const ModalCreate = memo(({ visible, setVisible, setRow, row, data, setData, setParams }) => {
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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const create = _.get(visible, "create", false);
  const type = _.get(visible, "type");

  const onFinish = async (values) => {
    let row = _.get(visible, "data");
    console.log(values);
    let params = params = {
      id: row.id,
      username: _.get(values, "username"),
      // password: _.get(values, "password"),
      groupid: _.get(values, "groupid"),
      name: _.get(values, "name"),
      address: _.get(values, "address"),
      email: _.get(values, "email"),
      phone: _.get(values, "phone"),
      status: status === false ? 0 : 1,
    };
    let url = "";
    if (type === "create") {
      url = "/user/create";
    } else {
      url = "/user/update";
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
      if (type === "create") {
        message = "Tạo mới tài khoản thành công";
      } else {
        message = "Sửa tài khoản thành công";
      }
      Ui.showSuccess({ message: message });
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
      setParams((preState) => {
        let nextState = { ...preState };
        nextState = nextState;
        return nextState;
      });
    }
  };
  const boweload = useCallback(async () => {
    if (type === "edit") {
      form.setFieldsValue(_.get(visible, "data"));
    }
  }, []);
  useEffect(() => {
    setTimeout(boweload, 0);
  }, [boweload]);
  const onStatus = (values) => {
    setStatus(values);
  };
  return (
    <Modal
      title={create === true ? "Thêm mới tài khoản" : "Sửa tài khoản"}
      visible={_.get(visible, "isShow")}
      onCancel={handleCancel}
      width="50%"
      destroyOnClose
      footer={[]}
    >
      <Form form={form} name="control-ref" onFinish={onFinish}>
        <Row gutter={15}>
          <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
                >
                  <Input placeholder="Username" value={getFieldValue("username")} />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          {/* <Col md={12}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col> */}
          <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                console.log(getFieldValue("groupid")),
                <Form.Item
                  name="groupid"
                  rules={[{ required: true, message: "Vui lòng chọn" }]}>
                  <Select
                    placeholder="Chọn quyền"
                    value={getFieldValue("groupid")}
                    allowClear
                  >
                    <Option value={1}>Admin</Option>
                    <Option value={2}>Mod</Option>
                    <Option value={3}>Client</Option>
                  </Select>
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
                >
                  <Input placeholder="Tên khách hàng" value={getFieldValue("name")} />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                <Form.Item
                  name="address"
                  rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
                >
                  <Input placeholder="Địa chỉ" value={getFieldValue("address")} />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Bạn nhập chưa đúng định dạng',
                    },
                    { required: true, message: "Vui lòng nhập dữ liệu" }
                  ]}
                >
                  <Input placeholder="Email" value={getFieldValue("email")} />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
                >
                  <Input placeholder="Điện thoại" value={getFieldValue("phone")} />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                <Form.Item name="status" label="Trạng thái">
                  <>
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                      onChange={onStatus}
                      checked={getFieldValue("status")}
                    />
                  </>
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          {/* <Col md={12}>
            <Form.Item shouldUpdate={true} noStyle>
              {({ getFieldValue }) => (
                <Form.Item
                  name="upload"
                  label="Ảnh đại diện"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
                </Form.Item>
              )}
            </Form.Item>
          </Col> */}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {create === true ? "Tạo mới" : "Cập nhật"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});
export default ModalCreate;
