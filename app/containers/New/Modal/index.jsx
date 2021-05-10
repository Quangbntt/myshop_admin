import React, { memo, useState, useEffect, useCallback, useRef } from "react";
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
import JoditEditor from "jodit-react";

let time = null;
const ModalCreate = memo(
  ({ visible, setVisible, setRow, row, data, setData, setParams }) => {
    const [form] = Form.useForm();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const config = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
    };
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
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    const fileList = [
      {
        uid: "-1",
        status: "done",
        url: _.get(visible, "data").user_image,
      },
    ];

    const type = _.get(visible, "type");

    const onFinish = async (values) => {
      let row = _.get(visible, "data");
      let params = {
        id: row.id,
        title: _.get(values, "title"),
        review: _.get(values, "review"),
        body: _.get(values, "body"),
        image: urlImage ? urlImage : row.user_image,
      };
      let url = "";
      if (type === "create") {
        url = "/news/create";
      } else {
        url = "/news/update";
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
          message = "Tạo mới tin tức thành công";
        } else {
          message = "Cập nhật tin tức thành công";
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
      let user = _.get(visible, "data");
      if (user) {
        let obj = {
          title: user.title,
          review: user.review,
          user_image: user.user_image,
          body: user.body,
        };
        type == "edit" && form.setFieldsValue(obj);
      }
    }, [visible]);
    useEffect(() => {
      setTimeout(boweload, 0);
    }, [boweload]);
    
    return (
      <Modal
        title={type === "create" ? "Thêm mới tin tức" : "Cập nhật tin tức"}
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
                    name="title"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Tiêu đề"
                      value={getFieldValue("title")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="review"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Tóm tắt"
                      value={getFieldValue("review")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="urlImage"
                    label="Ảnh chính"
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
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="body"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {type === "create" ? "Tạo mới" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
export default ModalCreate;
