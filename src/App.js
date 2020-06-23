import React, { Component } from 'react';
import Login from './components/pages/Login';
import About from './components/pages/About';
import Home from './components/pages/Home';
import LandingPage from './components/pages/LandingPage';
import Profile from './components/pages/Profile';
import MyAccount from './components/pages/MyAccount';
import './App.css';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
        <div className='header'>
          <a href='#home' className='logo'>
            {' '}
          </a>
          <a
            href='#default'
            className='header-left'
            style={{ fontSize: '32px' }}
          >
            She
            <span
              style={{
                color: 'rgb(8, 49, 231)',
                fontFamily: 'Titillium Web',
                fontWeight: 'bold',
                fontSize: '36px',
              }}
            >
              Help
            </span>
          </a>
          <div className='header-right'>
            <NavLink activeClassName='selected' to='/' exact>
              Home
            </NavLink>
            <NavLink to='/about' exact>
              About
            </NavLink>
            <NavLink to='/login' exact>
              Login
            </NavLink>
          </div>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/mapsPage' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/myProfile' component={MyAccount} />
            <Route exact path='*' component={LandingPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
