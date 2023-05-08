import {Image, Row} from "antd";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from 'swiper';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./style.scss";
import AntImage from "../../../common/AntImage/index.jsx";


const mockData = [
  {
    "image": "https://tuk-cdn.s3.amazonaws.com/can-uploader/cloud-logo-5-svg1.svg",
    "title": "Avatar: The Way of Water",
  },
  {
    "image": "https://tuk-cdn.s3.amazonaws.com/can-uploader/cloud-logo-5-svg2.svg",
    "title": "Black Adam",
  },
  {
    "image": "https://tuk-cdn.s3.amazonaws.com/can-uploader/cloud-logo-5-svg3.svg",
    "title": "Black Panther: Wakanda Forever",
  },
  {
    "image": "https://tuk-cdn.s3.amazonaws.com/can-uploader/cloud-logo-5-svg4.svg",
    "title": "Black Panther: Wakanda Forever",
  },
  {
    "image": "https://tuk-cdn.s3.amazonaws.com/can-uploader/cloud-logo-5-svg5.svg",
    "title": "Black Panther: Wakanda Forever",
  },
  {
    "image": "https://tuk-cdn.s3.amazonaws.com/can-uploader/cloud-logo-5-svg6.svg",
    "title": "Black Panther: Wakanda Forever",
  }
]


const Brands = () => {
  return(
    <div style={{marginBottom: 48}}>
      <h2 style={{textAlign: "left"}}>Brands</h2>
      <div style={{padding: "0 48px"}}>
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
            991: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 5,
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
          {mockData.map((item, index) => (
            <SwiperSlide key={index}>
              <AntImage
                style={{padding: "50px 0"}}
                width={'100%'}
                height={'100%'}
                src={item?.image}
                objectFit='contain'
                layout={'fixed'}
                preview={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Brands