import React, { Component } from 'react';
import fire from '../../config/Fire';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LockOpenIcon from '@material-ui/icons/LockOpen';
/*import LandingPage from './LandingPage';
import About from './About';
import Profile from './Profile';
import Home from './Home';
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from 'react-router-dom';*/

function Copyright() {
  return (
    <Typography variant="body2" float="center">
      <Link>
        <span style={{ fontFamily: 'cursive', fontSize: '18px' }}>
          {'Copyright©She'}
          <span style={{ color: 'blue' }}>{'Help'}</span>
          {new Date().getFullYear()}
        </span>
      </Link>
    </Typography>
  );
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      fireErrors: '',
      formTitle: 'Login',
      loginBtn: true,
      user: null,
      msg: '',
      uid: null,
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ ...this.state, user });
      } else {
        this.setState({ ...this.state, user: null });
      }
    });
  }

  login = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ ...this.state, msg: 'Login success' });
        window.alert('Login Successful!');
        const newId = fire.auth().currentUser.uid;
        console.log(newId);
      })
      .catch((error) => {
        this.setState({ ...this.state, fireErrors: error.message });
      });
  };
  register = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ ...this.state, msg: 'Registration success' });
        window.alert('Registration Successful!');
        const newId = fire.auth().currentUser.uid;
        console.log(newId);
      })
      .catch((error) => {
        this.setState({ ...this.state, fireErrors: error.message });
      });
  };

  getAction = (action) => {
    if (action === 'reg') {
      this.setState({
        ...this.state,
        formTitle: 'Register',
        loginBtn: false,
        fireErrors: '',
      });
    } else {
      this.setState({
        ...this.state,
        formTitle: 'Login',
        loginBtn: true,
        fireErrors: '',
      });
    }
  };
  handleChangeP = (e) => {
    this.setState({ ...this.state, password: e.target.value });
    var pswrd = this.state.password;
    // var hasError = (pswrd) =>
    //   !/^.(?=.{8,})((?=.[!@#$%^&()\-_=+{};:,<.>]){1})(?=.\d)((?=.[a-z]){1})((?=.[A-Z]){1}).*$/.test(
    //     pswrd
    //   );
    var err = this.hasError(pswrd);
    if (!err) {
      window.alert('successful');
      this.setState({ ...this.state, [e.target.name]: e.target.value });
    } else if (err) {
      //window.alert('Password format incorrect');

      return;
    }
  };
  hasError = (p) => {
    var hError = !/^.(?=.{8,})((?=.[!@#$%^&()\-_=+{};:,<.>]){1})(?=.\d)((?=.[a-z]){1})((?=.[A-Z]){1}).*$/.test(
      p
    );
    return hError;
  };
  handleChangeE = (e, em) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  render() {
    let errorNotification = this.state.fireErrors ? (
      <div className="Error"> {this.state.fireErrors} </div>
    ) : null;
    let submitBtn = this.state.loginBtn ? (
      <input
        className="loginBtn"
        type="submit"
        onClick={this.login}
        value="Submit"
      />
    ) : (
      <input
        className="loginBtn"
        type="submit"
        onClick={this.register}
        value="Submit"
      />
    );
    let login_register = this.state.loginBtn ? (
      <button className="registerBtn" onClick={() => this.getAction('reg')}>
        New User? Register
      </button>
    ) : (
      <button className="registerBtn" onClick={() => this.getAction('login')}>
        Existing user? Login
      </button>
    );
    if (this.state.msg === 'Login success') {
      return <Redirect to="/mapsPage" />;
    }
    if (this.state.msg === 'Registration success') {
      return <Redirect to="/profile" />;
    }

    return (
      <div className="bgimg">
        <div className="form_block">
          <div id="title">
            <LockOpenIcon style={{ fontSize: '22px' }} />
            {this.state.formTitle}
          </div>
          <div className="body">
            {errorNotification}
            <form>
              Email ID
              <br />
              <input
                type="text"
                value={this.state.email}
                placeholder="EmailID"
                onChange={this.handleChangeE}
                name="email"
              />
              Password
              <br />
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChangeP}
                placeholder="Password"
                name="password"
              />
              {submitBtn}
            </form>
            {login_register}
          </div>
        </div>
        <div
          style={{
            color: 'white',
            bottom: '0px',
            position: 'fixed',
            left: '625px',
          }}
        >
          <Copyright />
        </div>
      </div>
    );
  }
}
export default Login;
