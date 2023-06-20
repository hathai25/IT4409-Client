import {Carousel, notification} from "antd";
import {useEffect, useState} from "react";
import {getAllSliders} from "../../../../services/slider.service.js";

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

  useEffect(() => {
    try {
      getAllSliders().then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data.data.items)
          setSliders([...res?.data?.data?.items.map((item) => ({
            height: '600px',
            color: '#fff',
            lineHeight: '600px',
            textAlign: 'center',
            background: '#364d79',
            backgroundImage: `url(${item?.url})`,
          }))])
        } else {
          notification.error({
            message: "Error",
            description: "Can't get sliders"
          })
        }
      })
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Can't get sliders"
      })
    }
  })

  return(
    <div style={{marginBottom: "48px"}}>
      <Carousel effect="fade">
        {sliders.map((slider, index) => {
          return (
            <div key={index}>
              <h3 style={slider}></h3>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default Gallery