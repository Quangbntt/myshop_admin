import React, { memo, useState, useEffect, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  Row,
  Col,
  InputNumber,
} from "antd";
import _ from "lodash";
import {
  UploadOutlined,
} from "@ant-design/icons";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";

let time = null;
const ModalCreate = memo(
  ({
    visibleChild,
    setVisibleChild,
    setRow,
    row,
    dataBranch,
    setDataBranch,
    setParams
  }) => {
    const [form] = Form.useForm();
    const [status, setStatus] = useState(true);
    const handleOk = () => {
      setVisibleChild((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };
    const handleCancel = () => {
      form.resetFields();
      setVisibleChild((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };

    const create = _.get(visibleChild, "create", false);
    const type = _.get(visibleChild, "type");

    const onFinish = async (values) => {
      let product = _.get(visibleChild, "data");
      let params = {
        id: product.id,
        product_id: product.product_id,
        color: values.color,
        size_name: values.size_name,
        product_count: values.product_count,
      };
      let url = "";
      if (type==="create") {
        url = "/product/child-create";
      } else {
        url = "/product/child-update";
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
        if (type==="create") {
          message = "Tạo mới sản phẩm thành công";
        } else {
          message = "Cập nhật sản phẩm thành công";
        }
        Ui.showSuccess({ message: message });
        setVisibleChild((preState) => {
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
      let product = _.get(visibleChild, "data");
      if (product) {
        let obj = {
          product_id: product.product_id,
          color: product.color,
          size_name: product.size_name,
          product_count: product.product_count,
        };
        form.setFieldsValue(obj);
      }
    }, [visibleChild]);
    useEffect(() => {
      setTimeout(bowload, 0);
    }, [bowload]);

    return (
      <Modal
        title="Quản lý tài khoản"
        visible={_.get(visibleChild, "isShow")}
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
                    name="color"
                    label="Màu sắc"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Input
                      placeholder="Màu sắc"
                      value={getFieldValue("color")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="size_name"
                    label="Kích cỡ"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Kích cỡ"
                      value={getFieldValue("size_name")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="product_count"
                    label="Số lượng"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Số lượng"
                      value={getFieldValue("product_count")}
                    />
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
