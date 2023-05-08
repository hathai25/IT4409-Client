import {Image, Row} from "antd";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode, Navigation, Thumbs} from "swiper";
import React, {useState} from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import "./style.scss"

const ProductGallery = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/*Big image to view product*/}
      <Row>
        <Swiper
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          }}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true
          }}
          thumbs={{swiper: thumbsSwiper}}
          spaceBetween={90}
          navigation={true}
          modules={[Autoplay, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                key={index}
                src={image}
                width={"80%"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
      {/*Product image slider*/}
      <Row style={{marginTop: 12}}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper3"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                preview={false}
                key={index}
                src={image}
                height={"90px"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
    </>
  )
}

export default ProductGallery;