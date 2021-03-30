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
  Progress,
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
import { storage } from "../../../firebase/index";

const { Option } = Select;
const format = "HH:mm";
let time = null;
const ModalCreate = memo(
  ({ visible, setVisible, setRow, row, data, setData, setParams }) => {
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

    //Upload image to firebase
    const [image, setImage] = useState(null);
    const [urlImage, setUrlImage] = useState("");

    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
    const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrlImage(url);
            });
        }
      );
    };

    const onFinish = async (values) => {
      let row = _.get(visible, "data");
      let params = {
        branches_id: row.id,
        branches_name: _.get(values, "name"),
        branches_type: _.get(values, "type"),
        branches_image: urlImage,
      };
      let url = "";
      if (type === "create") {
        url = "/branch/create";
      } else {
        url = "/branch/update";
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
          message = "Thêm mới thương hiệu thành công";
        } else {
          message = "Sửa thương hiệu thành công";
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
    const fileList = [
      {
        uid: "-1",
        status: "done",
        url: _.get(visible, "data").image,
      },
    ];
    const boweload = useCallback(async () => {
      if (type === "edit") {
        form.setFieldsValue(_.get(visible, "data"));
      }
    }, [_.get(visible, "data")]);
    useEffect(() => {
      setTimeout(boweload, 0);
    }, [boweload]);

    return (
      <Modal
        title={type === "create" ? "Thêm mới thương hiệu" : "Sửa thương hiệu"}
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
                    name="name"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Tên thương hiệu"
                      value={getFieldValue("name")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="type"
                    rules={[{ required: true, message: "Vui lòng chọn" }]}
                  >
                    <Select
                      placeholder="Trạng thái"
                      value={getFieldValue("type")}
                      allowClear
                    >
                      <Option value={1}>Đang hợp tác</Option>
                      <Option value={0}>Dừng hợp tác</Option>
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="urlImage"
                    label="Logo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    onChange={handleChange}
                  >
                    <Upload
                      className="upload-list-inline"
                      listType="picture"
                      action={handleUpload}
                      defaultFileList={type === "edit" ? fileList : ""}
                    >
                      <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                    {/* <Button onClick={handleUpload}>Upload</Button> */}
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {create === true ? "Tạo mới" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
export default ModalCreate;
