import React,{Component} from 'react';
import '../App.css';
import {BrowserRouter} from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import './landing.css';  
import gPic from '../gandhisays.jpg';
import rPic from '../road.jpg';
import styled, {keyframes} from 'styled-components';
import { bounce } from 'react-animations';
class LandingPage extends Component {
    render() {
        const images = [
            { url: gPic },
            { url: rPic },
            { url: gPic },
            { url: gPic },
        ];
        const Bounce=styled.div `animation: 3s ${keyframes`${bounce}`} infinite`;
        return (
            <BrowserRouter>
                <div>
                    <div className="bgimg">
                        <div style={{minHeight:"110vh",marginTop:"0px",textAlign:"center",fontSize:"30px"}}>
                            <Bounce>
                                Welcome To She Help Home Page
                            </Bounce>
                            <div className="imgSlide" style={{marginTop:"30px", textAlign:"center",alignItems:"center"}}> 
                            <div className="carousel__wrap">
                                <SimpleImageSlider
                                    width={1000}
                                    height={504}
                                    images={images}
                                    slideDuration={1}
                                    navStyle={1}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
            
        );
    }
}
export default LandingPage;
