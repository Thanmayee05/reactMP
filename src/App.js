import React, {Component} from 'react';
import fire from './config/Fire';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user});
      }else{
        this.setState({user:null});
      }
    });
  }
  render(){
    return (
        <div>
          Welcome!
          {this.state.user ? (<Home />) : (<Login />)}
        </div>
    );
  }
}

export default App;