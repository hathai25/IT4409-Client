import {Button, Col, InputNumber, Popconfirm, Row, Table} from "antd";
import AntImage from "../../../common/AntImage/index.jsx";
import {formatCurrency} from "../../../../utils/string.js";
import {DeleteFilled} from "@ant-design/icons";
import {useState} from "react";

const MyCart = ({cart, onSelectProduct}) => {
  const rowSelection = {
    selectedRowKeys: localStorage.getItem('rowKey') ? JSON.parse(localStorage.getItem('rowKey')) : [],
    onChange: (key, data) => {
      onSelectProduct(data);
      localStorage.setItem('rowKey', JSON.stringify(key));
    },
  };
  return (
    <Table
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
          render: (text, record) => (
            <Row gutter={32}>
              <Col>
                <AntImage
                  src={record?.image}
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
                  margin: 0
                }}>{record?.title}</p>
              </Col>
            </Row>
          )
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          render: (text, record) => (
            <p>{formatCurrency(record?.price)}</p>
          )
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (quantity) => (
            <InputNumber
              min={1}
              max={10}
              defaultValue={quantity}
              onChange={(value) => console.log(value)}
            />
          )
        },
        {
          title: 'Subtotal',
          dataIndex: 'total',
          key: 'total',
          render: (text, record) => (
            <p>{formatCurrency(record?.price * record?.quantity)}</p>
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
                onConfirm={() => console.log('delete')
                  // handleDeleteItem(r.id, r.type_id, r.report_id)
                }
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