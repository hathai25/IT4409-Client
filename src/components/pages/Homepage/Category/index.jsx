import {Button, Card, Image, Row} from "antd";
import {Swiper, SwiperSlide} from "swiper/react";

import {CATEGORIES} from "./category.js";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Autoplay, Pagination} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./style.scss";
import {useNavigate} from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  return (
    <div style={{marginBottom: 48}}>
      <h2 style={{textAlign: "left"}}>Category</h2>
      <div>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            524: {
              slidesPerView: 2,
              autoplay: false
            },
            767: {
              slidesPerView: 3,
              autoplay: false
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={90}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {CATEGORIES.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                cover={<img src={item?.img} alt="Cover"/>}
                style={{width: '100%', position: 'relative', padding: "0 !important"}}
              >
                <Button
                  icon={<ArrowRightOutlined/>}
                  style={{
                    position: 'absolute',
                    top: '70%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '40px',
                  }}
                  onClick={() => {
                    navigate("/shop")
                  }}
                >
                  {item?.title}
                </Button>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Category