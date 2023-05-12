import {Col, Form, Input, notification, Row, Upload} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import {UserOutlined} from "@ant-design/icons";
import './style.scss';
import {useSelector} from "react-redux";
import AntButton from "../../components/common/Button/index.jsx";
import {useEffect, useState} from "react";
import {getUserInfo, updateUserInfo} from "../../services/user.service.js";

const MyAccount = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState(null);

  const handleUpdateInfo = (values) => {
    console.log(values)
    const sendData = values?.username !== userInfo?.username ? {
      ...values,
    } : {
      ...values,
      username: undefined
    }
    try {
      updateUserInfo(sendData).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: 'Success',
            description: 'Update successfully!',
          });
        } else {
          notification.error({
            message: 'Error',
            description: "Can't update user information"
          })
        }
      });
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Error',
        description: "Can't update user information"
      })
    }
  }

  useEffect(() => {
    try {
      getUserInfo().then((res) => {
        setUserInfo(res?.data?.data);
      });
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Error',
        description: "Can't get user information"
      })
    }
  }, []);

  return (
    <div className="account-wrapper">
      <Row>
        <Col xs={0} md={4}>
          <Sidebar/>
        </Col>
        <Col xs={24} md={20}>
          <div className="account-section">
            <h2>Account Information</h2>
            {userInfo && (

              <Form
                form={form}
                initialValues={{
                  ...userInfo,
                }}
                layout={"vertical"}
                onFinish={handleUpdateInfo}
              >
                <Form.Item
                  name={"avatar"}
                >
                  <Upload
                    listType={"picture-circle"}
                    fileList={[]}
                  >
                    <div>
                      <UserOutlined style={{fontSize: 32}}/>
                    </div>
                  </Upload>
                </Form.Item>
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
                <AntButton text={"Save"} style={{width: 200}} type={"primary"} htmlType={"submit"}/>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MyAccount