import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

class About extends Component{
    render(){
        return(
            <BrowserRouter>
                <div className="bgimg">
                    <div style={{minHeight:"110vh",marginTop:"30px",textAlign:"center",fontSize:"30px"}}>
                        ConTact US At:
                        SheHelp@gmail.com
                    </div>
                </div>                
            </BrowserRouter>
            

        )
    }
}
export default About