import {Button, Col, InputNumber, message, notification, Popconfirm, Row, Table, Tag} from "antd";
import AntImage from "../../../common/AntImage/index.jsx";
import {formatCurrency} from "../../../../utils/string.js";
import {DeleteFilled} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {deleteCartItem, getUserCart} from "../../../../services/cart.service.js";
import {getUserCartSuccess} from "../../../../redux/actions/cart.action.js";
import {useDispatch} from "react-redux";
import Spinner from "../../../common/Spinner/index.jsx";

const MyCart = ({cart, onSelectProduct}) => {
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.userId;
  const dispatch = useDispatch();
  const rowSelection = {
    onChange: (key, data) => {
      onSelectProduct(data);
      localStorage.setItem('rowKey', JSON.stringify(key));
    },
  };

  const handleDeleteCartItem = (id) => {
    try {
      deleteCartItem(id).then((res) => {
        if (res?.status === 200) {
          message.success('Delete cart item successfully');
          try {
            getUserCart(userId).then((res) => {
              dispatch(getUserCartSuccess(res?.data?.data?.items));
            });
          } catch (err) {
            console.log(err);
            notification.error({
              message: 'Error',
              description: "Can't get user cart!"
            });
          }
        } else {
          message.error('Delete cart item failed');
        }
      })
    } catch (error) {
      console.log({error})
    }
  }

  useEffect(() => {
    if (cart && cart?.length >= 0) setLoading(false);
  }, [cart]);

  return (
    loading ? <div style={{height: 500}}><Spinner/></div> : <Table
      rowKey={(record) => record?.id}
      dataSource={cart}
      pagination={false}
      rowSelection={rowSelection}
      columns={[
        {
          title: 'Product',
          dataIndex: 'title',
          key: 'title',
          width: 450,
          align: "center",
          render: (text, record) => {
            return (
              <Row gutter={32}>
                <Col>
                  <AntImage
                    src={record?.itemId?.mediaId}
                    width={160}
                    height={160}
                  />
                </Col>
                <Col>
                  <p style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    margin: "10px 0"
                  }}>{record?.itemId?.productDetailId?.productId?.name} - <Tag style={{marginLeft: 4}}>{record?.itemId?.size.toUpperCase()}</Tag> - <Tag style={{marginLeft: 4}} color={record?.itemId?.color}>{record?.itemId?.color}</Tag></p>
                </Col>
              </Row>)
          }
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          render: (text, record) => (
            <p>{formatCurrency(record?.itemId?.productDetailId?.productId?.price)}</p>
          )
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (quantity, record) => (
            <InputNumber
              min={1}
              max={10}
              defaultValue={record?.number}
              onChange={(value) => console.log(value)}
            />
          )
        },
        {
          title: 'Subtotal',
          dataIndex: 'total',
          key: 'total',
          render: (text, record) => (
            <p>{formatCurrency(record?.itemId?.productDetailId?.productId?.price * record?.number)}</p>
          )
        },
        {
          key: 'delete',
          align: 'center',
          // width: 60,
          // responsive: ['lg'],
          render: (r) => {
            return (
              <Popconfirm
                title='Are you sure ?'
                onConfirm={() => handleDeleteCartItem(r?.id)}
                okText='Yes'
                cancelText='Cancel'
                placement='topRight'
              >
                <Button
                  className='delete-button'
                  icon={
                    <DeleteFilled className='icon-delete-btn'/>
                  }
                  shape='circle'
                />
              </Popconfirm>
            );
          }
        },
      ]}
    />
  )
}

export default MyCart