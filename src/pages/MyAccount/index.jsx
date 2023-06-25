import {Col, Form, Input, message, notification, Row, Upload} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import {UserOutlined} from "@ant-design/icons";
import './style.scss';
import {useSelector} from "react-redux";
import AntButton from "../../components/common/Button/index.jsx";
import {useEffect, useState} from "react";
import {getUserInfo, updateUserInfo} from "../../services/user.service.js";
import axios from "axios";
import useCallApi from "../../hook/useCallApi.js";
import {getAllSliders} from "../../services/slider.service.js";
import Spinner from "../../components/common/Spinner/index.jsx";

const MyAccount = () => {
  const [form] = Form.useForm();
  const uploadInstance = axios.create()
  const handleUpload = (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const formData = new FormData();
    formData.append('file', file)
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET)
    try {
      uploadInstance.post("https://api.cloudinary.com/v1_1/dzazt6bib/image/upload", formData, {
        onUploadProgress: onProgress,
      })
        .then(res => {
          console.log({res})
          if (res) {
            onSuccess(file);
            const data = res?.data?.url
            console.log({data})
            form.setFieldValue("avatar", data)
            setFileList([{uid: '-1', name: 'image.png', status: 'done', url: data}])
          } else {
            onError(`${file.name} file upload failed.`);
          }
        })
    } catch (e) {
      message.error(`${file.name} tải file thành công.`);
    }
  }


  const [userInfo, setUserInfo] = useState(null);
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUpdateInfo = (values) => {
    console.log({values})
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
          fetchUserInfo()
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

  const { send: fetchUserInfo, loading } = useCallApi({
    callApi: getUserInfo,
    success: (res) => {
      setUserInfo(res?.data)
      let url = res?.data?.avatar;
      if (url !== null) setFileList([{uid: '-1', name: 'image.png', status: 'done', url: url}]);
    },
    error: () => {
      notification.error({
        message: 'Error',
        description: "Can't get user information"
      })
    }
  })

  useEffect(() => {
    fetchUserInfo()
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
            {loading ? <div style={{height: 600}}><Spinner/></div> : (
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
                    customRequest={handleUpload}
                    fileList={fileList}
                    onChange={handleChange}
                  >
                    {!fileList[0]?.url &&
                      <div>
                       <UserOutlined style={{fontSize: 32}}/>
                      </div>
                    }
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