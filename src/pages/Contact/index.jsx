import './styles.scss'
import a1 from './a1.png'
import a2 from './a2.png'
import a3 from './a3.png'
import a4 from './a4.png'
import { Rate } from 'antd';
import React,{useState} from 'react';
const Contact = () => {
  const img =[
    {id:0,value: a1},
    {id:1,value: a2},
    {id:2,value: a3},
    {id:3,value: a4},
  ];
  const [sliderData,setSliderData]=useState(img[0])
  const handleClick=(index)=>{
    console.log(index);
    const slider=img[index];
    setSliderData(slider);
  }

  return(
    <>
    <div className='category'>
    <div className='left'>
      <div className="head1">
        <img src={sliderData.value} className='img1'></img>
      </div>
      <div className="smallimg">
      {
      img.map((data,i)=>
      <div className="bottom">
        <img src={data.value} className='img2' key={data.id} onClick={()=>handleClick(i)}></img>
      </div>
      )
       }
       </div>
    </div>
    <div className="righ">
      <div className="righ1">
        <h1>Giày nam Air Jordan 1 Mid Grey Camo DC9035-100</h1>
        <Rate />
      </div>
      <div className="righ1">
        <h2>Giá tiền : 11.790.000₫</h2>
      </div>
      <div className="righ2">
        <h2>Chọn size giày:</h2>
        <select name="" id="">
    <option value="29">29</option>
    <option value="30">30</option>
    <option value="31">31</option>
    <option value="32">32</option>
  </select>
      </div>
      <div className="righ2">
        <div className="righ11">
<h2>Chọn Số Lượng Sản Phẩm:</h2>
        <input type="text" />
        </div>
       <div className="righ12">
        <button type="submit" className="but1">Buy Now</button>
        <button type="submit" className="but2">Add to Cart</button>
       </div>
      </div>
      </div>
    </div>
    
    </>
    
  )
  
}

export default Contact;
