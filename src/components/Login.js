import React, {Component} from 'react';
import fire from '../config/Fire';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name:'',
            fireErrors: '',
            formTitle: 'Login',
            loginBtn: true
        }
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }
    
    register = e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    getAction = action => {
        if(action === 'reg'){
            this.setState({formTitle: 'Register', loginBtn: false, fireErrors: ''});
        }else{
            this.setState({formTitle: 'Login', loginBtn: true, fireErrors: ''});
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){

        let errorNotification = this.state.fireErrors ? 
            ( <div className="Error"> {this.state.fireErrors} </div> ) : null;

        let submitBtn = this.state.loginBtn ? 
            (<input className="loginBtn" type="submit" onClick={this.login} value="Submit" />) : 
            (<input className="loginBtn" type="submit" onClick={this.register} value="Submit" />);

        let login_register = this.state.loginBtn ?
            (<button className="registerBtn" onClick={() => this.getAction('reg')}>New User? Register</button>) : 
            (<button className="registerBtn" onClick={() => this.getAction('login')}>Existing user? Login</button>)

        return(
            <div>
            <div className="bgimg">
                <div class="header">
                    <a href="#home" class="logo"></a>
                    <a href="#default" class="header-left" style={{fontSize:"32px"}}>She<span style={{color:'rgb(8, 49, 231)',fontFamily:'Titillium Web',fontWeight:'bold',fontSize:'36px'}}>Help</span></a>
                    <div class="header-right">
                        <a class="active" href="#home">Home</a>
                        <a href="#contact">Contact</a>
                        <a href="#About">About</a>
                    </div>
                </div>
                <div className="form_block">
                    <div id="title">{this.state.formTitle}</div>
                    <div className="body">
                        {errorNotification}
                        <form>
                            Email ID
                            <br></br>
                            <input type="text" 
                            value={this.state.email} 
                            placeholder="EmailID"
                            onChange={this.handleChange} 
                            name="email" />
                            Password
                            <br></br>
                            <input type="password" 
                            value={this.state.password} 
                            onChange={this.handleChange}
                            placeholder="Password" 
                            name="password" />

                            {submitBtn}
                        </form>
                        {login_register}
                    </div>
                </div>
            </div>
            </div>
            
        )
    }
}

export default Login;