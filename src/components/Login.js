import React, { Component } from 'react';
import fire from '../config/Fire';
import { Redirect } from 'react-router-dom';
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
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ msg: 'Login success' });
        const newId = fire.auth().currentUser.uid;
        console.log(newId);
      })
      .catch(error => {
        this.setState({ fireErrors: error.message });
      });
  };
  register = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ msg: 'Registration success' });
        const newId = fire.auth().currentUser.uid;
        console.log(newId);
      })
      .catch(error => {
        this.setState({ fireErrors: error.message });
      });
  };

  getAction = action => {
    if (action === 'reg') {
      this.setState({ formTitle: 'Register', loginBtn: false, fireErrors: '' });
    } else {
      this.setState({ formTitle: 'Login', loginBtn: true, fireErrors: '' });
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    let errorNotification = this.state.fireErrors ? (
      <div className='Error'> {this.state.fireErrors} </div>
    ) : null;
    let submitBtn = this.state.loginBtn ? (
      <input
        className='loginBtn'
        type='submit'
        onClick={this.login}
        value='Submit'
      />
    ) : (
      <input
        className='loginBtn'
        type='submit'
        onClick={this.register}
        value='Submit'
      />
    );
    let login_register = this.state.loginBtn ? (
      <button className='registerBtn' onClick={() => this.getAction('reg')}>
        New User? Register
      </button>
    ) : (
      <button className='registerBtn' onClick={() => this.getAction('login')}>
        Existing user? Login
      </button>
    );
    if (this.state.msg === 'Login success') {
      return <Redirect to='/mapsPage' />;
    }
    if (this.state.msg === 'Registration success') {
      return <Redirect to='/profile' />;
    }

    return (
      <div className='bgimg'>
        <div className='form_block'>
          <div id='title'>{this.state.formTitle}</div>
          <div className='body'>
            {errorNotification}
            <form>
              Email ID
              <br />
              <input
                type='text'
                value={this.state.email}
                placeholder='EmailID'
                onChange={this.handleChange}
                name='email'
              />
              Password
              <br />
              <input
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
                placeholder='Password'
                name='password'
              />
              {submitBtn}
            </form>
            {login_register}
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
