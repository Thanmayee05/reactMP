import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';
import './landing.css';
import gPic from '../../images/gandhisays.jpg';
import sPic from '../../images/strong.jpg';
import wPic from '../../images/womenStrong.jpg';
import mPic from '../../images/malala2.png';
import tPic from '../../images/protection3.jpg';
import oPic from '../../images/obama2.jpg';

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
                display:'flex',
              }}
            >  
            <div style={{fontSize:'40px'}}>

            </div>
            <div className='imgSlide'>
              <SimpleImageSlider
                width={1000} 
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
