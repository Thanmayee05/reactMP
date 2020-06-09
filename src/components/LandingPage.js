import React,{Component} from 'react';
import '../App.css';
import {BrowserRouter} from 'react-router-dom';
class HomePage extends Component {
    render(){
        return(
            <BrowserRouter>
                <div className="bgimg">
                    <div style={{minHeight:"110vh",marginTop:"30px",textAlign:"center",fontSize:"30px"}}>
                        Welcome To She Help Home Page
                    </div>
                </div>
                
            </BrowserRouter>
            
        );
    }
}
 export default HomePage;