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
import {
  CloseOutlined,
  CheckOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import { storage } from "../../../firebase/index";

const { Option } = Select;
const { TextArea } = Input;
const format = "HH:mm";
let time = null;
const ModalCreate = memo(({ visible, setVisible, setRow, row, dataBranch, setDataBranch }) => {
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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const create = _.get(visible, "create", false);
  const type = _.get(visible, "type");

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
      url = "/product/create";
    } else {
      url = "/product/update";
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
    let product = _.get(visible, "data");
    console.log(product);
    if (product) {
      let obj = {
        product_name: product.product_name,
        size_id: product.size_id,
        product_image: product.product_image,
        product_more_image: product.product_more_image,
        product_detail: product.product_detail,
        product_status: product.product_status,
        product_viewcount: product.product_viewcount,
        product_rate: product.product_rate,
        product_size: product.product_size,
        product_metatitle: product.product_metatitle,
        product_description: product.product_description,
        product_promotion: product.product_promotion,
        product_includedvat: product.product_includedvat,
        product_price: product.product_price,
        product_quantity: product.product_quantity,
        product_categoryid: product.product_categoryid,
        product_material: product.product_material,
        product_sex: product.sex
      };
      form.setFieldsValue(obj);
    }
  }, [visible]);
  useEffect(() => {
    setTimeout(bowload, 0);
  }, [bowload]);
  
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
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_name"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Tên sản phẩm"
                      value={getFieldValue("product_name")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_metatitle"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Tên sản phẩm không dấu"
                      value={getFieldValue("product_metatitle")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_description"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Chi tiết sản phẩm"
                      value={getFieldValue("product_description")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_promotion"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Giá nhập"
                      value={getFieldValue("product_promotion")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_price"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Giá xuất"
                      value={getFieldValue("product_price")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_quantity"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Số lượng"
                      value={getFieldValue("product_quantity")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_material"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Chất liệu"
                      value={getFieldValue("product_material")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_sex"
                    rules={[{ required: true, message: "Vui lòng chọn" }]}
                  >
                    <Select
                      placeholder="Giới tính"
                      value={getFieldValue("product_sex")}
                      allowClear
                    >
                      <Option value={1}>Nữ</Option>
                      <Option value={2}>Nam</Option>
                      <Option value={3}>Unisex</Option>
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_status"
                    rules={[{ required: true, message: "Vui lòng chọn" }]}
                  >
                    <Select
                      placeholder="Trạng thái"
                      value={getFieldValue("product_status")}
                      allowClear
                    >
                      <Option value={1}>Hết hàng</Option>
                      <Option value={1}>Còn hàng</Option>
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_code"
                    rules={[{ required: true, message: "Vui lòng chọn" }]}
                  >
                    <Select
                      placeholder="Thương hiệu"
                      value={getFieldValue("product_code")}
                      allowClear
                    >
                      {_.map(dataBranch, (item, key) => {
                        return(
                          <Option value={item.id}>{item.name}</Option>
                        )
                      })}
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
                    {/* <Button onClick={handleUpload}>Upload</Button> */}
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="urlImage"
                    label="Ảnh phụ"
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
