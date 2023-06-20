import {Col, Modal, notification, Row, Tag} from "antd";
import AntImage from "../../../common/AntImage/index.jsx";
import {getOrderByDetail} from "../../../../services/order.service.js";
import {useEffect, useState} from "react";
import {formatCurrency} from "../../../../utils/string.js";

const OrderDetailModal = ({ order_id, showModal, handleCancel }) => {
  const [orders, setOrders] = useState()
  const fetchOrderDetail = () => {
    try {
      getOrderByDetail(order_id).then(res => {
        if (res?.status === 200) {
          console.log(res?.data?.data)
          setOrders(res?.data?.data)
        } else {
          notification.error({
            header: "Error",
            message: "Get orders failed!"
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchOrderDetail()
  }, [order_id])

  console.log({showModal})

  return(
    <Modal
      title="Order Detail"
      open={showModal}
      onCancel={handleCancel}
      onOk={handleCancel}
      width={1000}
    >
      {orders && <Row span={24}>
        {orders?.orderItems?.map(order => (
          <Col span={24} style={{marginBottom: "1rem"}}>
            <Row>
              <Col span={20}>
                <Row>
                  <Col span={4}>
                    <AntImage src={order?.productAttributeDefault?.mediaId} width={100} height={100}/>
                  </Col>
                  <Col span={16}>
                    <p>{order?.productAttributeDefault?.productDetailId?.productId?.name} <b>x {order?.number}</b></p>
                    <p><Tag color={"blue"}>{order?.productAttributeDefault?.size}</Tag> - <Tag
                      color={order?.productAttributeDefault?.color}>{order?.productAttributeDefault?.color}</Tag></p>
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <p>Price</p>
                <p style={{color: "#1677FF"}}>{formatCurrency(order?.productAttributeDefault?.productDetailId?.productId?.price)}</p>
              </Col>

            </Row>
          </Col>
        ))}
        <Col span={24}>
          <Col style={{marginLeft: "auto"}} span={4}>
            <p>Total: {orders && formatCurrency(orders?.totalMoney)}</p>
          </Col>
        </Col>
      </Row>}
    </Modal>
  )
}

export default OrderDetailModal;