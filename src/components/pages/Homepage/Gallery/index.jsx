import {Carousel} from "antd";

const contentStyle = {
  height: '600px',
  color: '#fff',
  lineHeight: '600px',
  textAlign: 'center',
  background: '#364d79',
  backgroundImage: "url('https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/972e353f-99a4-4838-9526-d89fd1d2eb3e/nike-just-do-it.jpg')",
};
const Gallery = () => {
  return(
    <div style={{margin: "96px 0 48px 0"}}>
      <Carousel effect="fade">
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  )
}

export default Gallery