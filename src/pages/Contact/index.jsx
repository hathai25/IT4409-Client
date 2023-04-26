import './styles.scss'
import a1 from './a1.png'
import a2 from './a2.png'
import a3 from './a3.png'
import a4 from './a4.png'
import { Rate } from 'antd';
import React,{useState} from 'react';
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
const Contact = () => {
  const img =[
    {id:0,value: a1},
    {id:1,value: a2},
    {id:2,value: a3},
    {id:3,value: a4},
  ];
  const chosecolor = [
    {d : 0 , va : "Trắng"},
    {d : 1 , va : "Vàng Nâu"},
    {d : 2 , va : "Đen"},
    {d : 3 , va : "Xanh"},
  ]
  const[appState,changeChange]=useState({
    activeButton : null,
    Butt :
    [
      {i : 1 , val : 36},
      {i : 2 , val : 37},
      {i : 3 , val : 38},
      {i : 4 , val : 39},
      {i : 5 , val : 40},
      {i : 6 , val : 41},
      {i : 7 , val : 42}
    ]
  });
  function toggleActive(index){
    changeChange({...appState,activeButton:appState.Butt[index]});
  }
  function toggleActiveStyles(index){
    if(appState.Butt[index]===appState.activeButton){
      return "chosse active";
    }
    else{
      return "chosse inactive";
    }
  }
  const [sliderData,setSliderData]=useState(img[0])
  const handleClick=(index)=>{
    console.log(index);
    const slider=img[index];
    setSliderData(slider);
  }
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
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
      <div className="chossesize">
        <h2>Chọn size:</h2>
      {appState.Butt.map((k,index)=>(
        <button className={toggleActiveStyles(index)} key={index} onClick={()=>{
          toggleActive(index);
        }} >{k.val}</button>
      ))}
      <h2>Chọn màu sản phẩm :</h2>
      {
        chosecolor.map((data,i)=>
        <button className='chossecolor' key={i} onClick={()=>handleClick(i)}>{data.va}</button>
        )
      }
      </div>
      <div className="righ3">
        <div className="righ11">
<h2>Chọn Số Lượng Sản Phẩm:</h2>
<div className="increas">
<button onClick={handleDecrease}><MinusOutlined /></button>
<span>{quantity}</span> 
<button onClick={handleIncrease}><PlusOutlined /></button>
</div>
        </div>
       <div className="righ12">
        <button type="submit" className="but1">Buy Now</button>
        <button type="submit" className="but2">Add to Cart</button>
       </div>
      </div>
      </div>
      
    </div>
    <div className="come"></div>
      <div className="bottom12">
        <h2>Chi tiết sản phẩm</h2>
        <p>Chất liệu</p>
        <p>Xuất xứ</p>
        <p>Chiều dài áo khoác</p>
        <p>Kiểu Áo khoác</p>
        <p>Gửi từ</p>
      </div>
    
    </>
    
  )
  
}

export default Contact;
