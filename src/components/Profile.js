import React, { Component } from 'react';
import fire from '../config/Fire';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      phoneno: null,
      email: '',
      city: '',
      formTitle: 'UserProfile',
      userDetails: [],
      //msg:''
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  getUserData = () => {
    let ref = fire.database().ref('/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };
  componentDidUpdate() {
    //if (prevState !== this.state) {
    this.writeUserData();
    //}
  }
  componentDidMount() {
    this.getUserData();
  }
  //user = uid => this.db.ref(`users/${uid}`);
  /*onCollectionUpdate = (querySnapshot) => {
    const userDetails = [];
    querySnapshot.forEach((doc) => {
      const { uname,phoneno,email,city } = doc.data();
      userDetails.push({
        key:'',
        doc, // DocumentSnapshot
        uname,
        phoneno,
        email,
        city
      });
    });
    this.setState({
      userDetails
    });
  }*/

  writeUserData = () => {
    fire.database().ref('/').set(this.state);
    console.log('DATA SAVED');
  };
  handleSub = e => {
    e.preventDefault();
    const uname = this.state.uname;
    const phoneno = this.state.phoneno;
    const email = this.state.email;
    const city = this.state.city;
    const uid = this.state.uid;
    if (uid && uname && phoneno && email && city) {
      const { users } = this.state;
      const devIndex = users.findIndex(data => {
        return data.uid === uid;
      });
      users[devIndex].uname = uname;
      users[devIndex].phoneno = phoneno;
      users[devIndex].email = email;
      users[devIndex].city = city;
      this.setState({ users });
    } else if (uname && phoneno && email && city) {
      //const uid = new Date().getTime().toString();
      const { users } = this.state;
      console.log(users);
      users.push({ uname, phoneno, email, city });
      this.setState({ users });
    }
    this.setState({
      uname: '',
      phoneno: null,
      email: '',
      city: '',
    });
  };

  /*let messageRef = fire.database().ref('profile').orderByKey().limitToLast(100);
    fire.database().ref('profile').push(this.state.text);
    if(this.state.phoneno===null)
    {
      window.alert("Invalid Phone Number");
    }
    else
    {
      this.setState({
        uname :'',
        phoneno:null,
        email:'',
        city:''
      })
      this.setState({msg:"Profile updated"});
    }
  }*/
  render() {
    if (this.state.msg === 'Profile updated') {
      return <Redirect to='/mapsPage' />;
    }
    //const { users } = this.state;
    return (
      <div className='bgimg'>
        <div className='form_block'>
          <div id='title'>{this.state.formTitle}</div>
          <div className='body'>
            <form>
              User Name
              <br />
              <input
                type='text'
                value={this.state.uname}
                placeholder='UserName'
                onChange={this.handleChange}
                required
                name='uname'
              />
              Phone Number
              <br />
              <input
                type='text'
                required
                inputmode='numeric'
                value={this.state.phoneno}
                placeholder='PhoneNumber'
                onChange={this.handleChange}
                name='phoneno'
              />
              Email ID
              <br />
              <input
                type='text'
                value={this.state.email}
                placeholder='EmailID'
                required
                onChange={this.handleChange}
                name='email'
              />
              City
              <br />
              <input
                type='text'
                value={this.state.city}
                onChange={this.handleChange}
                placeholder='CityName'
                required
                name='city'
              />
              <br />
              <br />
              <button onClick={this.handleSub}>SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
