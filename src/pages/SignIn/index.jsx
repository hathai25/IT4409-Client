import {FacebookFilled, GoogleCircleFilled, LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Col, Row} from 'antd';
import "./style.scss";
import {Link} from "react-router-dom";

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return(
    <div className="login-container">
      <Col className="login-container-card" xs={24} md={12} lg={6}>
        <h2>Login</h2>
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
              className="login-input"
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
              className="login-input"
            />
          </Form.Item>
          <div className={"login-forgot-password"}>
            <Link to={"/"} className="login-form-forgot" href="">
              Forgot password?
            </Link>
          </div>
          <Button type="primary" htmlType="submit" className="login-button-submit">
            Log in
          </Button>
          <div className="login-other">
            Or sign in with
            <div>
              <Button>
                <GoogleCircleFilled style={{fontSize: 24}}/>
              </Button>
              <Button>
                <FacebookFilled  style={{fontSize: 24}}/>
              </Button>
            </div>
          </div>
          <div className="login-forgot-password">
            Don't have an account?
          </div>
            <Button className="login-button-register">
              <Link to={"/sign-up"}>Register now!</Link>
            </Button>
        </Form>
      </Col>
    </div>
  )
}

export default SignIn