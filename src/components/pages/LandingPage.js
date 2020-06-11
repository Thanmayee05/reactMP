import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';
import './landing.css';
import gPic from '../../images/gandhisays.jpg';
import sPic from '../../images/strong.jpg';
import wPic from '../../images/womenStrong.jpg';
import mPic from '../../images/malala2.png';
//import pPic from '../../images/priceless2.jpg';
import tPic from '../../images/protection3.jpg';
import oPic from '../../images/obama2.jpg';
//import styled, { keyframes } from 'styled-components';
//import { bounce } from 'react-animations';

class LandingPage extends Component {
  render() {
    const images = [{ url: sPic }, { url: mPic }, { url: gPic }, { url: wPic },{url: tPic},{url: oPic}];
    /*const Bounce = styled.div`
      animation: 3s ${keyframes`${bounce}`} infinite;
    `;*/
    return (
      <BrowserRouter>
        <div>
          <div className='landingbg' >
            <div style={{
                fontSize:'30px',
                margin:'60px',
                display:'flex',
              }}
            >
              <span style={{color:"white", textAlign:"center", fontSize:"30px", marginTop:'80px'}}>
                Welcome To<br/>
                <span style={{fontSize:"50px"}} >
                  She<span style={{color:'blue'}}>Help</span>
                </span><br/>
                Think Safe<br/>Act Safe<br/>Be Safe<br/>Because you deserve
              </span>
              <div className='imgSlide'>
                  <SimpleImageSlider
                    width={850}
                    height={500}
                    images={images}
                    slideDuration={1}
                    navStyle={1}
                  />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default LandingPage;
