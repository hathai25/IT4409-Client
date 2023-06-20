import {Carousel} from "antd";
import Gallery from "../../components/pages/Homepage/Gallery/index.jsx";
import Services from "../../components/pages/Homepage/Services/index.jsx";
import Category from "../../components/pages/Homepage/Category/index.jsx";
import Brands from "../../components/pages/Homepage/Brands/index.jsx";
import Subscribe from "../../components/pages/Homepage/Subscribe/index.jsx";

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