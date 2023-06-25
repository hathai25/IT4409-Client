import {Button, Col, Modal, notification, Row, Table, Tag} from "antd";
import {cancelOrder, getOrderByStatus, receiveOrder} from "../../../../services/order.service.js";
import {useEffect, useState} from "react";
import {formatCurrency} from "../../../../utils/string.js";
import OrderDetailModal from "../OrderDetailModal/index.jsx";
import {CheckOutlined, CloseCircleOutlined} from "@ant-design/icons";
import useCallApi from "../../../../hook/useCallApi.js";
import Spinner from "../../../common/Spinner/index.jsx";

const OrderTable = ({ order_status }) => {
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showReceivedModal, setShowReceivedModal] = useState(false)
  const [rowData, setRowData] = useState()

  const handleReceivedOrder = () => {
    try {
      receiveOrder(rowData?.id).then(res => {
        if (res?.status === 200) {
          notification.success({
            header: "Success",
            message: "Update order successfully!"
          })
          setShowReceivedModal(false)
          fetchOrders()
        } else {
          notification.error({
            header: "Error",
            message: "Update order failed!"
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleCancelOrder = () => {
    try {
      cancelOrder(rowData?.id).then(res => {
        if (res?.status === 200) {
          notification.success({
            header: "Success",
            message: "Cancel order successfully!"
          })
          setShowCancelModal(false)
          fetchOrders()
        } else {
          notification.error({
            header: "Error",
            message: "Cancel order failed!"
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const { send: fetchOrders, loading} = useCallApi({
    callApi: getOrderByStatus,
    success: (res) => {
      setOrders(res?.data?.items)
    },
    error: (e) => {
      notification.error({
        header: "Error",
        message: "Get orders failed!"
      })
    }
  })

  useEffect(() => {
    fetchOrders(order_status)
  }, [order_status])

  return(
    <>
      {loading ? <div style={{height: 500}}><Spinner/></div> : (
        <>
          <Table
            rowKey={(record) => record?.id}
            columns={[
              {
                title: 'Order Id',
                dataIndex: 'id',
                key: 'id',
                width: 150,
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 150,
                render: (value) => <Tag color={value === "Prepared" ? "grey" : value === "Delivering" ? "blue" :
                value === "Delivered" ? "green" : value === "Received" ? "green" : "red"}>{value === "Received" ? "Success" : value}</Tag>
              },
              {
                title: 'Detail',
                dataIndex: '',
                key: 'detail',
                width: 150,
                render: (value, row) => <Button type={"link"} onClick={() => {
                  setRowData(row)
                  setShowModal(true)
                }}>Detail</Button>
              },
              {
                title: 'Payment Method',
                dataIndex: 'paymentType',
                key: 'paymentType',
                width: 150,
              },
              {
                title: 'Total Money',
                dataIndex: 'totalMoney',
                key: 'totalMoney',
                width: 150,
                render: (value) => <p>{formatCurrency(value)}</p>
              },
              {
                title: "Action",
                dataIndex: "",
                key: "action",
                width: 150,
                render: (value, row) => {
                  if (row?.status === "Failure") return null
                  else return(
                  <>
                    {row?.status === "Prepared" &&
                      <span style={{color: "orange", cursor: "pointer"}}
                            onClick={() => {
                              setRowData(row)
                              setShowCancelModal(true)
                            }}
                      ><CloseCircleOutlined style={{fontSize: 14}} /></span>}
                    {row?.status === "Delivered" &&
                      <span style={{color: "#1677FF", cursor: "pointer"}}
                            onClick={() => {
                              setRowData(row)
                              setShowReceivedModal(true)
                            }}
                      ><CheckOutlined style={{fontSize: 14}} /></span>}
                  </>)
                }
              }
            ]}
            dataSource={orders}
          />
          <OrderDetailModal
            showModal={showModal}
            handleCancel={() => setShowModal(false)}
            order_id={rowData?.id}
          />
          <Modal
            open={showCancelModal}
            onCancel={() => setShowCancelModal(false)}
            title={"Cancel Order"}
            onOk={handleCancelOrder}
          >
            <p>Are you sure to cancel this order?</p>
          </Modal>
          <Modal
            open={showReceivedModal}
            onCancel={() => setShowReceivedModal(false)}
            title={"Receive Order"}
            onOk={handleReceivedOrder}
          >
            <p>Are you sure to update this order as "received" ?</p>
          </Modal>
        </>
      )}
    </>
  )
}

export default OrderTable;