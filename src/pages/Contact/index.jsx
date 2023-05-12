import {Col, Form, Input, notification, Row} from "antd";
import "./style.scss"
import AntButton from "../../components/common/Button/index.jsx";

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (!values) return
    form.resetFields();
    notification.success({
      message: "Success!",
      description: "Your message has been sent. We will get back to you as soon as possible.",
      duration: 3
    })
  }
  return (
    <div>
      <Row gutter={32}>
        <Col xs={24} md={12}>
          <div className="background">
            <h1>Contact Us</h1>
            <p>Need to get in touch with us? Either fill out the form with
              your inquiry or find the department email you'd like to contact below.
            </p>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Form
            form={form}
            name={"contact"}
            layout={"vertical"}
            onFinish={onFinish}
            className="contact-form"
          >
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[{required: true, message: 'Please input your first name!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[{required: true, message: 'Please input your last name!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{required: true, message: 'Please input your email!'}, {type: 'email', message: 'Please input a valid email!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="description"
              label="What can we help you with?"
              rules={[{required: true, message: 'Please input your request!'}]}
            >
              <TextArea/>
            </Form.Item>
            <Form.Item>
              <AntButton style={{width: "40%"}} text={"Submit"} htmlType={"submit"}/>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </div>
  )
}

export default Contact