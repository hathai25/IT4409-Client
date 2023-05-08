import {FacebookFilled, GoogleCircleFilled, LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Col, Row} from 'antd';
import "./style.scss";
import {Link, useNavigate} from "react-router-dom";
import AntButton from "../../components/common/Button/index.jsx";

const SignIn = () => {
  const navigate = useNavigate();
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
          <AntButton text={"Log in"} htmlType="submit" theme={'dark'} style={{width: "100%", borderRadius: 20}}/>
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
          <AntButton text={"Register now!"} onClick={() => navigate("/sign-up")} theme={'white'} style={{width: "100%", borderRadius: 20, border: "1px solid #000"}}/>

        </Form>
      </Col>
    </div>
  )
}

export default SignIn