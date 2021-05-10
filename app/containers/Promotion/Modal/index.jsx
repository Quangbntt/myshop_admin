import React, { memo, useState, useEffect, useCallback, useRef } from "react";
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
  InputNumber,
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
import SelectMultiple from "components/SelectMultiple";
import TextArea from "antd/lib/input/TextArea";

const ModalCreate = memo(
  ({ visible, setVisible, setRow, row, data, setData, setParams }) => {
    const [form] = Form.useForm();
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

    const onFinish = async (values) => {
      const productArr = [];
      _.map(values.product_id, (item, key) => {
        productArr.push(item.value);
      });
      let row = _.get(visible, "data");
      let params = {
        id: row.id,
        product_id: productArr,
        discount: _.get(values, "discount"),
        type: _.get(values, "type"),
        status: status === false ? 0 : 1,
        body: _.get(values, "body"),
      };
      let url = "";
      url = "/promotion/create";
      let result = await ServiceBase.requestJson({
        url: url,
        method: "POST",
        data: params,
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        let message = "";
        message = "Tạo mới khuyến mại thành công";
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
        form.setFieldsValue(obj);
      }
    }, [visible]);
    useEffect(() => {
      setTimeout(boweload, 0);
    }, [boweload]);
    const [status, setStatus] = useState(true);
    const onStatus = (values) => {
      setStatus(values);
    };
    return (
      <Modal
        title="Thêm mới khuyến mại"
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
                    name="discount"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Giảm giá"
                      value={getFieldValue("discount")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_id"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <SelectMultiple
                      url="/product/list-name-filter"
                      placeholder="Tên sản phẩm"
                      // value={params.product}
                      onChange={(value) => {
                        let product = value;
                        getQuery(product, "product");
                      }}
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
                      placeholder="Loại giảm giá"
                      value={getFieldValue("type")}
                      allowClear
                    >
                      <Option value={1}>Phần trăm</Option>
                      <Option value={2}>Tiền</Option>
                    </Select>
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
            <Col md={24}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="body"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <TextArea
                      placeholder="Nội dung"
                      value={getFieldValue("body")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
export default ModalCreate;
