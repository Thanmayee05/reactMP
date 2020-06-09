import React, {Component} from 'react';
import Login from './components/Login';
import About from './components/About';
import Home from './components/Home';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import './App.css';
import {BrowserRouter as Router, NavLink,Switch, Route } from 'react-router-dom';
class App extends Component {
  render(){
    return (
        <div>
           <Router>
            <div class="header">
                <a href="#home" class="logo"> {" "}</a>
                <a href="#default" class="header-left" style={{fontSize:"32px"}}>She<span style={{color:'rgb(8, 49, 231)',fontFamily:'Titillium Web',fontWeight:'bold',fontSize:'36px'}}>Help</span></a>
                  <div class="header-right">
                      <NavLink active to="/" exact>Home</NavLink>
                      <NavLink to="/about" exact>About</NavLink>
                      <NavLink to="/login" exact>Login</NavLink>
                      <NavLink to="/profile" exact>Profile</NavLink>

                  </div>
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/mapsPage" component={Home}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="*" component={HomePage} />

                </Switch>
            </div>
          </Router>
        </div>
    );
  }
}
export default App;