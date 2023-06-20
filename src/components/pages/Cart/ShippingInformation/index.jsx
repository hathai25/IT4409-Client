import {Col, Form, Input, Modal, notification, Row} from "antd";
import AntButton from "../../../common/Button/index.jsx";
import { useEffect, useState } from "react";
import {addAddress, getUserAddress} from "../../../../services/address.service.js";
import AddressSelectCard from "../../Address/AddressSelectCard/index.jsx";
import AddressFormModal from "../../Address/AddressFormModal/index.jsx";

const ShippingInformation = ({userInfo, form, shippingId}) => {
  const [addressSelected, setAddressSelected] = useState(null)
  const [listAddress, setListAddress] = useState([]);
  const [otherAddressModal, setOtherAddressModal] = useState(false);
  const [newAddressModal, setNewAddressModal] = useState(false);

  const handleOnclickOtherAddress = () => {
    setOtherAddressModal(true);
  }

  const handleOkNewAddress = (values) => {
    try {
      addAddress(values).then(res => {
        console.log(res)
        if (res.status === 201) {
          form.setFieldsValue({
            'phone': values?.phone,
            'address': values?.detail + ', ' + values?.commune + ', ' + values?.district + ', ' + values?.provice + ', ' + values?.country,
          })
          setNewAddressModal(false);
          notification.success({
            header: "Success",
            message: "Add new address successfully!"
          })
        } else {
          notification.error({
            header: "Error",
            message: "Add new address failed!"
          })
        }
      })
    } catch (e) {
      console.log(e)
      notification.error({
        header: "Error",
        message: "Add new address failed!"
      })
    }
  }

  useEffect(() => {
    getUserAddress().then((res) => {
      setListAddress(res?.data?.data?.items);
      form.setFieldsValue({
        'phone': res?.data?.data?.items.find(e => e?.isDefault === true).phone,
        'address': res?.data?.data?.items.find(e => e?.isDefault === true)?.detail + ', ' + res?.data?.data?.items.find(e => e?.isDefault === true)?.commune + ', ' + res?.data?.data?.items.find(e => e?.isDefault === true)?.district + ', ' + res?.data?.data.items.find(e => e?.isDefault === true)?.provice + ', ' + res?.data?.data?.items.find(e => e?.isDefault === true)?.country,
      })
      shippingId.current = res?.data?.data?.items.find(e => e?.isDefault === true)?.id
    })
  }, [])

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
                </Form.Item>
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
                    onClick={() => setNewAddressModal(true)}
                  />
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
              form.setFieldsValue({
                'phone': addressSelected?.phone,
                'address': addressSelected?.detail + ', ' + addressSelected?.ward + ', ' + addressSelected?.district + ', ' + addressSelected?.provice + ', ' + addressSelected?.country,
              })
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
        <AddressFormModal
          visible={newAddressModal}
          handleCancel={() => setNewAddressModal(false)}
          handleOk={handleOkNewAddress}
        />
      </div>
    </Col>
  )
}

export default ShippingInformation