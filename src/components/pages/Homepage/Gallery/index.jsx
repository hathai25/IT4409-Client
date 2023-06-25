import {Carousel, notification} from "antd";
import {useEffect, useState} from "react";
import {getAllSliders} from "../../../../services/slider.service.js";
import useCallApi from "../../../../hook/useCallApi.js";
import {getProductDetail} from "../../../../services/shop.service.js";
import Spinner from "../../../common/Spinner/index.jsx";

const contentStyle = {
  height: '600px',
  color: '#fff',
  lineHeight: '600px',
  textAlign: 'center',
  background: '#364d79',
  backgroundImage: "url('https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/972e353f-99a4-4838-9526-d89fd1d2eb3e/nike-just-do-it.jpg')",
};
const Gallery = () => {
  const [sliders, setSliders] = useState([])

  const { send: fetchSliders, loading } = useCallApi({
    callApi: getAllSliders,
    success: (res) => {
      console.log(res)
      setSliders([...res?.data?.items.map((item) => ({
        height: '600px',
        color: '#fff',
        lineHeight: '600px',
        textAlign: 'center',
        background: '#364d79',
        backgroundImage: `url(${item?.url})`,
      }))])
    },
    error: () => {
      notification.error({
        message: "Error",
        description: "Something went wrong"
      })
    }
  })

  useEffect(() => {
    fetchSliders()
  }, [])

  return(
    <div style={{marginBottom: "48px"}}>
      {loading ? <div style={{display: "block", height: 600}}><Spinner/></div> : (
        <Carousel effect="fade">
          {sliders.map((slider, index) => {
            return (
              <div key={index}>
                <h3 style={slider}></h3>
              </div>
            )
          })}
        </Carousel>
      )}
    </div>
  )
}

export default Gallery