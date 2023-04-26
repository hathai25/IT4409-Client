import './stylesss123.scss'
import React,{useState} from 'react';
const About = () => {
  return(
    <>
    <div className="contact22">
      <div className="leftt">
        <h2>Contact Us</h2>
        <p>Need to get in touch with us ? Either fill out the form with your inquiry or find the department email you'd like to contact below.</p>
      </div>
      <div className="right">
        <form>
          <div className="head1">
            <h3 className='a1'>*First Name</h3>
            <h3>Last Name</h3>
          </div>
          <div className="head2">
            <input type='text' className='input1'></input>
            <input type='text'></input>
          </div>
          <div className="head3">
            <h3>Email</h3>
          </div>
          <div className="head4">
            <input type='text'></input>
          </div>
          <div className="head5">
            <h3>What Can We Help You With ?</h3>
          </div>
          <div className="head6">
            <textarea></textarea>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default About;
