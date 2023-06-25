import {Col, notification, Row} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import AntButton from "../../components/common/Button/index.jsx";
import AddressFormModal from "../../components/pages/Address/AddressFormModal/index.jsx";
import {useEffect, useState} from "react";
import {addAddress, getUserAddress, setDefaultAddress} from "../../services/address.service.js";
import AddressSelectCard from "../../components/pages/Address/AddressSelectCard/index.jsx";
import useCallApi from "../../hook/useCallApi.js";
import Spinner from "../../components/common/Spinner/index.jsx";

const Address = () => {
  const [visible, setVisible] = useState(false)
  const [addressList, setAddressList] = useState([])
  const [addressSelected, setAddressSelected] = useState()
  const handleSubmitAddress = (values) => {
    try {
      addAddress(values).then(res => {
        if (res.status === 201) {
          setVisible(false)
          notification.success({
            header: "Success",
            message: "Add new address successfully!"
          })
          fetchAddress()
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

  const handleSetAddressDefault = () => {
    try {
      setDefaultAddress(addressSelected?.id).then(res => {
        if (res.status === 200) {
          notification.success({
            header: "Success",
            message: "Set default address successfully!"
          })
          fetchAddress()
        } else {
          notification.error({
            header: "Error",
            message: "Set default address failed!"
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const { send: fetchAddress, loading } = useCallApi({
    callApi: getUserAddress,
    success: (res) => {
      console.log(res)
      setAddressList(res?.data?.items)
    },
    error: (err) => {
      notification.error({
        message: "Error",
        description: "Something went wrong"
      })
    }
  })

  useEffect(() => {
    fetchAddress()
  }, [])

  return (
    <Row>
      <Col xs={0} md={4}>
        <Sidebar/>
      </Col>
      <Col xs={24} md={20} style={{padding: '2rem'}}>
        <Row justify={"space-between"}>
          <AntButton text="Add new address" type="primary" style={{marginBottom: '2rem'}}
            onClick={() => setVisible(true)}
          />
          <AntButton text="Use as default address" theme="light" style={{marginBottom: '2rem'}}
                     onClick={handleSetAddressDefault} disabled={addressSelected?.isDefault}
          />
        </Row>
        {loading ? <div style={{height: 500}}><Spinner/></div> : (
          <Row gutter={[16, 16]}>
            {addressList.map((address, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <AddressSelectCard
                  address={address}
                  onClick={() => setAddressSelected(address)}
                  selected={addressSelected}
                />
              </Col>
            ))}
          </Row>
        )}
      </Col>
      <AddressFormModal
        visible={visible}
        handleCancel={() => setVisible(false)}
        handleOk={handleSubmitAddress}
      />
    </Row>
  );
}

export default Address