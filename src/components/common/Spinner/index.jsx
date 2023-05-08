import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const spinIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Spinner = ({...props}) =>
  <div style={{
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
} }>
    <Spin {...props} indicator={spinIcon} />
  </div>;
export default Spinner;