import {Carousel} from "antd";
import Gallery from "../../components/pages/Homepage/Gallery/index.jsx";
import Services from "../../components/pages/Homepage/Services/index.jsx";
import Category from "../../components/pages/Homepage/Category/index.jsx";
import Brands from "../../components/pages/Homepage/Brands/index.jsx";
import Subscribe from "../../components/pages/Homepage/Subscribe/index.jsx";

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
};

const Homepage = () => {
  return (
    <div>
      <Gallery/>
      <Brands/>
      <Services/>
      <Category/>
      <Subscribe/>
    </div>
  );
}

export default Homepage