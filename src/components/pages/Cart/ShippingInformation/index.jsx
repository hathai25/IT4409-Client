import {Col, Form, Input, Modal, notification, Row} from "antd";
import AntButton from "../../../common/Button/index.jsx";
import { useEffect, useState } from "react";
import {addAddress, getUserAddress} from "../../../../services/address.service.js";
import AddressSelectCard from "../../Address/AddressSelectCard/index.jsx";
import AddressFormModal from "../../Address/AddressFormModal/index.jsx";
import useCallApi from "../../../../hook/useCallApi.js";
import {getAllSliders} from "../../../../services/slider.service.js";
import Spinner from "../../../common/Spinner/index.jsx";

const ShippingInformation = ({userInfo, form, shippingId}) => {
  const [listAddress, setListAddress] = useState([]);

  const { send: fetchUserAddress, loading } = useCallApi({
    callApi: getUserAddress,
    success: (res) => {
      setListAddress(res?.data?.items);
      form.setFieldsValue({
        'phone': res?.data?.items.find(e => e?.isDefault === true).phone,
        'address': res?.data?.items.find(e => e?.isDefault === true)?.detail + ', ' + res?.data?.items.find(e => e?.isDefault === true)?.commune + ', ' + res?.data?.items.find(e => e?.isDefault === true)?.district + ', ' + res?.data?.items.find(e => e?.isDefault === true)?.provice + ', ' + res?.data?.items.find(e => e?.isDefault === true)?.country,
      })
      shippingId.current = res?.data?.items.find(e => e?.isDefault === true)?.id
    },
    error: () => {
      notification.error({
        message: "Error",
        description: "Something went wrong"
      })
    }
  })

  useEffect(() => {
    fetchUserAddress()
  }, [])



  return (
    <Col xs={24} md={20}>
      <div className="account-section">
        {loading ? <div style={{height: 500}}><Spinner/></div> : (
          <Form
            form={form}
            initialValues={{
              ...userInfo,
            }}
            layout={"vertical"}
          >
            {() => (
              <>

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
                  {/* button as link to use other address, onclick popup modal */}
                </Form.Item>
              </>
            )}
          </Form>
        )}
      </div>
    </Col>
  )
}

export default ShippingInformation