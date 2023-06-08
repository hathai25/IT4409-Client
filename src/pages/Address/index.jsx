import {Col, notification, Row} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import AntButton from "../../components/common/Button/index.jsx";
import AddressFormModal from "../../components/pages/Address/AddressFormModal/index.jsx";
import {useEffect, useState} from "react";
import {addAddress, getUserAddress} from "../../services/address.service.js";
import AddressSelectCard from "../../components/pages/Address/AddressSelectCard/index.jsx";

const Address = () => {
  const [visible, setVisible] = useState(false)
  const [addressList, setAddressList] = useState([])
  const [addressSelected, setAddressSelected] = useState()
  const handleSubmitAddress = (values) => {
    console.log(values)
    try {
      addAddress(values).then(res => {
        console.log(res)
        if (res.status === 201) {
          setVisible(false)
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
    getUserAddress().then(res => {
      setAddressList(res?.data?.data?.items)
    })
  }, [])

  return (
    <Row>
      <Col xs={0} md={4}>
        <Sidebar/>
      </Col>
      <Col xs={24} md={20} style={{padding: '2rem'}}>
        <Row>
          <AntButton text="Add new address" type="primary" style={{marginBottom: '2rem'}}
            onClick={() => setVisible(true)}
          />
        </Row>
        <Row gutter={[16, 16]}>
          {addressList.map((address, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              {/* use antd card */}
              <AddressSelectCard 
                address={address}
                onClick={() => setAddressSelected(address)}
                selected={addressSelected?._id === address?._id}  
              />
            </Col>
          ))}
        </Row>
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