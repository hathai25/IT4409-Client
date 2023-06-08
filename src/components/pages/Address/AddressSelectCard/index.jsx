import { Card } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const AddressSelectCard = ({ address, onClick, selected }) => {
    return (
        <Card
          title="Address"
          style={{
            width: '100%',
            textAlign: "left",
            border: selected ? "1px solid #0d6efd" : "1px solid #d9d9d9"
          }}
            onClick={onClick}
        >
          <p>
            <span style={{fontWeight: 600}}>
                {address?.fullname}
            </span> |  
            <span style={{color: "#0d6efd", marginLeft: 2}}>
                {address?.phone}
            </span>
            </p>
          <p>
            <HomeOutlined style={{color: "#0d6efd", marginRight: 5}}/> 
            {address?.detail}, {address?.commune}, {address?.district}, {address?.provice}, {address?.country}
            </p>
        </Card>
    );
}

export default AddressSelectCard;