import {Button, Card, Col, Form, Input, InputNumber, Popconfirm, Radio, Row, Space, Table, Tag} from "antd";
import AntImage from "../../../common/AntImage/index.jsx";
import {formatCurrency} from "../../../../utils/string.js";
import {BankOutlined, DeleteFilled, HomeOutlined, MoneyCollectOutlined} from "@ant-design/icons";
import {useState} from "react";

const PaymentMethod = ({cart, shippingInfo, form, totalPrice}) => {
  totalPrice.current = cart?.reduce((acc, cur) => {
    return acc + cur?.itemId?.productDetailId?.productId.price * cur?.number
  }, 0);
  return (
    <Row gutter={32}>
      <Col span={16}>
        <Table
          rowKey={(record) => record?.id}
          dataSource={cart}
          pagination={false}
          columns={[
            {
              title: 'Product',
              dataIndex: 'title',
              key: 'title',
              width: 450,
              align: "center",
              render: (text, record) => (
                <Row gutter={32}>
                  <Col>
                    <AntImage
                      src={record?.itemId?.mediaId}
                      width={160}
                      height={160}
                    />
                  </Col>
                  <Col>
                    <p style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      margin: "10px 0"
                    }}>{record?.itemId?.productDetailId?.productId?.name} - <Tag style={{marginLeft: 4}}>{record?.itemId?.size.toUpperCase()}</Tag> - <Tag style={{marginLeft: 4}} color={record?.itemId?.color}>{record?.itemId?.color}</Tag></p>
                  </Col>
                </Row>
              )
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
              align: "center",
              render: (text, record) => (
                <p>{formatCurrency(record?.itemId?.productDetailId?.productId?.price)}</p>
              )
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
              align: "center",
              render: (text, record) => (
                <p>{record?.number}</p>
              )
            },
            {
              title: 'Subtotal',
              dataIndex: 'total',
              key: 'total',
              align: "center",
              render: (text, record) => (
                <p>{formatCurrency(record?.itemId?.productDetailId?.productId?.price * record?.number)}</p>
              )
            },
          ]}
        />
        <Card
          title="Payment Method"
          style={{
            width: '100%',
            textAlign: "left",
            marginTop: "2rem"
          }}
        >
          <Form
            form={form}
          >
            <Form.Item
              name={"paymentMethod"}
              rules={[
                {
                  required: true,
                  message: 'Please select payment method!',
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={"cash"}><MoneyCollectOutlined/> Cash on delivery</Radio>
                  <Radio value={"vnpay"}><BankOutlined/>VN Pay</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Ship to"
          style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "2rem"
          }}
        >
          <p><span style={{fontWeight: 600}}>{shippingInfo?.username}</span> | <span style={{color: "#0d6efd"}}>{shippingInfo?.phone}</span></p>
          <p><HomeOutlined style={{color: "#0d6efd"}}/> {shippingInfo?.address}</p>
        </Card>
        <Card
          title="Order Summary"
          style={{
            width: '100%',
            textAlign: "left"
          }}
        >
          <h3><span>Sub total: </span> <span style={{color: "#0d6efd", float: "right"}}>{formatCurrency(totalPrice.current)}</span></h3>
          <p
            style={{
              paddingBottom: "1rem",
              borderBottom: " 1px solid #d9d9d9",
              }}
          >Shipping: <span style={{color: "#0d6efd", float: "right"}}>{formatCurrency(20000)}</span></p>
          <h3>Total: <span style={{color: "#0d6efd", float: "right"}}>{formatCurrency(totalPrice.current + 20000)}</span></h3>
        </Card>
      </Col>
    </Row>
  )
}

export default PaymentMethod