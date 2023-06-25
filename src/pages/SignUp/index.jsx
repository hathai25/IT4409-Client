import {
  FacebookFilled,
  GoogleCircleFilled, HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined
} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Col, Row, notification} from 'antd';
import "./style.scss";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../services/auth.service.js";
import AntButton from "../../components/common/Button/index.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const result = await registerUser(values).then((res) => res);
      if (result.status === 201) {
        notification.success({
          message: 'Success',
          description: 'Sign up successfully! Redirecting to sign in page...',
        });
        form.resetFields();
        setTimeout(() => {
          navigate('/sign-in');
        }, 3000);
      } else if (result.status === 400) {
        notification.error({
          message: 'Error',
          description: 'Username or email already exists!',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Something went wrong! Please try again.',
        });
      }
    } catch (e) {
      console.log(e);
      notification.error({
        message: 'Error',
        description: 'Something went wrong! Please try again.',
      });
    }
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
          form={form}
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
          <AntButton text={"Sign up"} htmlType="submit" theme={'dark'} style={{width: "100%", borderRadius: 20}}/>
          {/*<div className="signup-other">*/}
          {/*  Or sign up with*/}
          {/*  <div>*/}
          {/*    <Button>*/}
          {/*      <GoogleCircleFilled style={{fontSize: 24}}/>*/}
          {/*    </Button>*/}
          {/*    <Button>*/}
          {/*      <FacebookFilled  style={{fontSize: 24}}/>*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="signup-forgot-password">
            Already have an account?
          </div>
          <AntButton text={"Sign in here!"} onClick={() => navigate("/sign-in")} theme={'white'} style={{width: "100%", borderRadius: 20, border: "1px solid #000"}}/>
        </Form>
      </Col>
    </div>
  )
}

export default SignUp