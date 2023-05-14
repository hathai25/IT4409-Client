import {Col, Form, Input, Upload} from "antd";
import {UserOutlined} from "@ant-design/icons";
import AntButton from "../../../common/Button/index.jsx";

const ShippingInformation = ({userInfo, form}) => {
  return (
    <Col xs={24} md={20}>
      <div className="account-section">
        {userInfo && (
          <Form
            form={form}
            initialValues={{
              ...userInfo,
            }}
            layout={"vertical"}
          >
            <Form.Item
              label={"Username"}
              title={"Username"}
              name={"username"}
              rules={[
                { required: true, message: "Please input your username!" }
              ]}
            >
              <Input
                placeholder="Username"
                className={"account-section-input"}
              />
            </Form.Item>
            <Form.Item
              label={"Email"}
              name={"email"}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please input a valid email!" }
              ]}
            >
              <Input
                placeholder="Email"
                className={"account-section-input"}
              />
            </Form.Item>
            <Form.Item
              label={"Phone"}
              name={"phone"}
              rules={[
                { required: true, message: "Please input your username!" },
                { pattern: /^0[0-9]{9}$/, message: "Please input a valid phone number!" }
              ]}
            >
              <Input
                placeholder="Phone number"
                className={"account-section-input"}
              />
            </Form.Item>
            <Form.Item
              label={"Address"}
              name={"address"}
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                placeholder="Address"
                className={"account-section-input"}
              />
            </Form.Item>
          </Form>
        )}
      </div>
    </Col>
  )
}

export default ShippingInformation