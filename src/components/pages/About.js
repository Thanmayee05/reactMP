import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

/*import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route,
  } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';*/

class About extends Component{
    render(){
        return(
            <Router>
                <div className="bgimg">
                    <div style={{marginTop:"20px",textAlign:"center",fontSize:"20px",color:'white',padding:'10px',margin:"50px"}}>
                        <div style={{textAlign:"left"}}>
                            About Us:<br/>
                            Our She<span style={{color:"blue"}}>Help</span> was established in year 2020.<br/>
                            <p>
                                This is a Women Safety Initiative.
                            </p>
                            <p>
                                Crimes against women have been increasing at an alarming rate in our country day-by-day. 
                                As per datapublished by National Crime Records Bureau(NCRB), the crimes rose from 3,793 per million to 3,886 since last year.
                                While Government is taking measures to ensure the Safety of women,
                                A crime-free society is a distant dream.
                                Therefore, women have to take stpes to ensure their own safety on a daily basis.
                            </p>
                            <p>
                                Through our webiste, we are proposing an oppurtunity for locating, tagging potential Danger Zones.
                            </p>
                            <p>
                                Features we provide:<br/>
                                User Registration<br/>
                                Facility for tagging potential danger zones in google map along with relevant details.<br/>
                                Facility for locating danger zones tagged by other users so that the same can be used for planning a safe route while travelling.
                            </p>
                            <br/>
                            <p>
                                If you wish to contribute your ideas, please feel free to share with us at:<br/>
                                <span style={{fontSize:"25px"}}>
                                MailID: SheHelp@gmail.com<br/>
                                Contact us at: 9090909090.
                                </span>
                            </p>
                        </div>
                    </div>
                    </div>            
            </Router>
            

        )
    }
}
export default About