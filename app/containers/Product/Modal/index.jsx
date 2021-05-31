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
  InputNumber,
} from "antd";
import _, { valuesIn } from "lodash";
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
const urlChildArr = [];
const ModalCreate = memo(
  ({
    visible,
    setVisible,
    setRow,
    row,
    dataBranch,
    setDataBranch,
    dataCategory,
    setParams
  }) => {
    const [form] = Form.useForm();
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
        url: _.get(visible, "data").product_image,
      },
    ];

    //Upload moreimage to firebase
    const [imageChild, setImageChild] = useState(null);
    const [urlImageChild, setUrlImageChild] = useState("");
    const handleChangeChild = (e) => {
      if (e.target.files[0]) {
        setImageChild(e.target.files[0]);
      }
    };
    const handleUploadChild = () => {
      const uploadTask = storage
        .ref(`images/${imageChild.name}`)
        .put(imageChild);
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
            .child(imageChild.name)
            .getDownloadURL()
            .then((url) => {
              urlChildArr.push(url);
              setUrlImageChild(url);
            });
        }
      );
    };
    const normFileChild = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileListChild;
    };
    const fileListChild = [];
    const dataNew = _.get(visible, "data").product_more_image
      ? _.get(visible, "data").product_more_image
      : [];
    let dataObj = {};
    _.map(dataNew[0], (itemData, index) => {
      dataObj = {
        uid: index,
        status: "done",
        url: itemData,
      };
      fileListChild.push(dataObj);
    });

    const create = _.get(visible, "create", false);
    const type = _.get(visible, "type");

    const onFinish = async (values) => {
      let params = {};
      let arrMore = [];
      if (type === "edit") {
        let row = _.get(visible, "data");
        _.map(fileListChild, (item, key) => {
          if(item.status==="done") {
            arrMore.push(item.url);
          }
        })
        let arr_image = _.concat(arrMore, urlChildArr);
        params = {
          product_id: row.product_id,
          product_code: values.product_code,
          product_description: values.product_description,
          product_material: values.product_material,
          product_metatitle: values.product_metatitle,
          product_name: values.product_name,
          product_price: values.product_price,
          product_promotion: values.product_promotion,
          product_quantity: values.product_quantity,
          product_sex: values.product_sex,
          product_status: values.product_status,
          product_image: urlImage ? urlImage : row.product_image,
          product_more_image: arr_image,
          product_category_id: values.product_category_id,
        };
      } else {
        params = {
          product_code: values.product_code,
          product_description: values.product_description,
          product_material: values.product_material,
          product_metatitle: values.product_metatitle,
          product_name: values.product_name,
          product_price: values.product_price,
          product_promotion: values.product_promotion,
          product_quantity: values.product_quantity,
          product_sex: values.product_sex,
          product_status: values.product_status,
          product_image: urlImage,
          product_more_image: urlChildArr,
          product_category_id: values.product_category_id,
        };
      }

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
          message = "Tạo mới sản phẩm thành công";
        } else {
          message = "Cập nhật sản phẩm thành công";
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
    const bowload = useCallback(async () => {
      let product = _.get(visible, "data");
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
          product_category_id: product.product_category_id,
          product_material: product.product_material,
          product_sex: product.sex,
          product_code: product.product_code,
        };
        form.setFieldsValue(obj);
      }
    }, [visible]);
    useEffect(() => {
      setTimeout(bowload, 0);
    }, [bowload]);

    return (
      <Modal
        title="Quản lý sản phẩm"
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
                    label="Tên"
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
                    label="Viết tắt"
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
                    label="Chi tiết"
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
                    label="Giá nhập"
                  >
                    <InputNumber
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
                    label="Giá xuất"
                  >
                    <InputNumber
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
                    label="Số lượng"
                  >
                    <InputNumber
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
                    label="Chất liệu"
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
                    label="Giới tính"
                  >
                    <Select
                      placeholder="Giới tính"
                      value={getFieldValue("product_sex")}
                      allowClear
                    >
                      <Option key={1} value={1}>
                        Nữ
                      </Option>
                      <Option key={2} value={2}>
                        Nam
                      </Option>
                      <Option key={3} value={3}>
                        Unisex
                      </Option>
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
                    label="Trạng thái"
                  >
                    <Select
                      placeholder="Trạng thái"
                      value={getFieldValue("product_status")}
                      allowClear
                    >
                      <Option key={0} value={0}>
                        Hết hàng
                      </Option>
                      <Option key={1} value={1}>
                        Còn hàng
                      </Option>
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
                    label="Thương hiệu"
                  >
                    <Select
                      placeholder="Thương hiệu"
                      value={getFieldValue("product_code")}
                      allowClear
                    >
                      {_.map(dataBranch, (item, key) => {
                        return (
                          <Option key={key} value={`${item.id}`}>
                            {item.name}
                          </Option>
                        );
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
                    name="product_category_id"
                    rules={[{ required: true, message: "Vui lòng chọn" }]}
                    label="Loại sản phẩm"
                  >
                    <Select
                      placeholder="Loại sản phẩm"
                      value={getFieldValue("product_category_id")}
                      allowClear
                    >
                      {_.map(dataCategory, (item, key) => {
                        return (
                          <Option key={key} value={item.id}>
                            {item.name}
                          </Option>
                        );
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
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="urlImageChild"
                    label="Ảnh phụ"
                    valuePropName="fileListChild"
                    getValueFromEvent={normFileChild}
                    onChange={handleChangeChild}
                  >
                    <Upload
                      className="upload-list-inline"
                      listType="picture"
                      action={handleUploadChild}
                      defaultFileList={
                        type === "edit" ? [...fileListChild] : ""
                      }
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
              {type === "edit" ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
export default ModalCreate;
