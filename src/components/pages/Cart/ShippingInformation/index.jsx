import {Col, Form, Input, Modal, Row} from "antd";
import AntButton from "../../../common/Button/index.jsx";
import { useEffect, useState } from "react";
import { getUserAddress } from "../../../../services/address.service.js";
import AddressSelectCard from "../../Address/AddressSelectCard/index.jsx";

const ShippingInformation = ({userInfo, form}) => {
  const [addressSelected, setAddressSelected] = useState(null)
  const [listAddress, setListAddress] = useState([]);
  const [otherAddressModal, setOtherAddressModal] = useState(false);

  const handleOnclickOtherAddress = () => {
    setOtherAddressModal(true);
  }

  useEffect(() => {
    getUserAddress().then((res) => {
      console.log(res);
      setListAddress(res?.data?.data?.items);
      console.log(res?.data?.data?.items[0]);
      form.setFieldValues({
        'phone': res?.data?.data?.items[0]?.phone,
        'address': res?.data?.data?.items[0]?.detail + ', ' + res?.data?.data?.items[0]?.ward + ', ' + res?.data?.data?.items[0]?.district + ', ' + res?.data?.data?.provice + ', ' + res?.data?.data?.items[0]?.country,
      })
    })
  }, [form])

  console.log(addressSelected)


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
                  <AntButton
                    type={"link"}
                    className={"account-section-input"}
                    text="Use other address?"
                    onClick={handleOnclickOtherAddress}
                  />
                  <AntButton
                    type={"link"}
                    className={"account-section-input"}
                    text="New address?"
                  />
                </Form.Item>
              </>
            )}
          </Form>
        )}
        <Modal
          title="Use other address"
          open={otherAddressModal}
          onCancel={() => setOtherAddressModal(false)}
          onOk={() => {
            setOtherAddressModal(false)
            // form.setFieldsValue({
            //   'phone': addressSelected?.phone,
            //   'address': addressSelected?.detail + ', ' + addressSelected?.ward + ', ' + addressSelected?.district + ', ' + addressSelected?.provice + ', ' + addressSelected?.country,
            // })
          }}
        >
          <Row gutter={[16, 16]}>
            {listAddress.map((address) => (
              <Col xs={24} md={12}>
                <AddressSelectCard
                  key={address.id}
                  address={address}
                  onClick={() => setAddressSelected(address)}
                  selected={addressSelected?.id === address.id}
                />
              </Col>
            ))}
          </Row>
        </Modal>
      </div>
    </Col>
  )
}

export default ShippingInformation