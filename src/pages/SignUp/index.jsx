import {
  FacebookFilled,
  GoogleCircleFilled, HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined
} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Col, Row} from 'antd';
import "./style.scss";
import {Link} from "react-router-dom";

const SignUp = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return(
    <div className="signup-container">
      <Col className="signup-container-card" xs={24} md={12} lg={6}>
        <h2>Sign Up with us today!</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please type your username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="signup-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please type your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="signup-input"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: 'Must be a valid mail address!' },
              { required: true, message: 'Please type your email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
              className="signup-input"
            />
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[
              { type: "number", message: 'Must be a valid phone number!' },
              { required: true, message: 'Please type your phone number!' }
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              type="phone number"
              placeholder="Phone Number"
              className="signup-input"
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please type your address!' }]}
          >
            <Input
              prefix={<HomeOutlined className="site-form-item-icon" />}
              type="address"
              placeholder="Address"
              className="signup-input"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="signup-button-submit">
            Sign up
          </Button>
          <div className="signup-other">
            Or sign up with
            <div>
              <Button>
                <GoogleCircleFilled style={{fontSize: 24}}/>
              </Button>
              <Button>
                <FacebookFilled  style={{fontSize: 24}}/>
              </Button>
            </div>
          </div>
          <div className="signup-forgot-password">
            Already have an account?
          </div>
            <Button className="signup-button-register">
              <Link to={"/sign-in"}>Sign in here!</Link>
            </Button>
        </Form>
      </Col>
    </div>
  )
}

export default SignUp