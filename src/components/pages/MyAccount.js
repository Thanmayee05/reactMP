import React, { Component } from 'react';
import fire from '../../config/Fire';
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('coordinates');
    this.state = {
      //markerslist: [],
      userDe: [],
      lng: '',
      lat: '',
      msg: true,
      uname: '',
      email: '',
      phoneno: '',
      city: '',
    };
  }

  componentDidMount() {
    this.setFireBaseAuth();
  }

  setFireBaseAuth = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getProfiledata(user.uid);
      } else {
      }
    });
  };

  /*getmarkersList = (event) => {
    const db = fire.firestore();
    let udata = [];
    const keyId = fire.auth().currentUser.uid;
    window.alert(keyId);
    db.collection('coordinates')
      .doc(keyId)
      .collection('Markers')
      .get()
      .then((snapshot) => {
        window.alert('reached2');
        snapshot.docs.forEach((doc) => {
          const { lat, lng } = doc.data();
          udata.push({ lat, lng });
        });
        const { lng, lat } = this.state;
        const newElement = { lat: lat, lng: lng };
        this.setState({
          markerslist: [...this.state.markerslist, newElement],
        });
        console.log(udata);
        //this.setState({ markerslist: udata });
      })
      .catch((error) => {
        window.alert('not reached!');
      });
    event.preventDefault();
  };*/

  getProfiledata = (uid) => {
    const keyId = fire.auth().currentUser.uid;
    const userD = [];
    fire
      .firestore()
      .collection('UserDetails')
      .doc(keyId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('Doc data is ', doc.data().uname);
        }
        this.setState({ ...this.state, userDe: userD });
      })
      .catch((error) => {
        //window.alert('not reached!');
        console.log('reached error');
      });
  };

  handleSub = (e) => {
    e.preventDefault();
    const { uname, phoneno, email, city } = this.state;
    const keyId = fire.auth().currentUser.uid;
    const db = fire.firestore();
    if (uname === '' || phoneno === '' || email === '' || city === '') {
      window.alert('Fill out all the fields');
      return;
    } else {
      db.collection('UserDetails')
        .doc(keyId)
        .set({
          uname,
          phoneno,
          email,
          city,
        })
        .then(() => {
          this.setState({
            ...this.state,
            uname: '',
            phoneno: '',
            email: '',
            city: '',
          });
          window.alert('Profile updated');
          this.setState({ ...this.state, msg: 'Profile updated' });
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          window.alert('Error adding');
        });
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  shiftToLogin = (event) => {
    this.setState({ ...this.state, msg: false });
  };
  render() {
    if (this.state.msg === false) {
      return <Redirect to="/mapsPage" />;
    }
    const { userDe } = this.state;
    return (
      <div className="bgimg">
        <div className="form_block">
          <div style={{ marginLeft: '80px' }}>
            <AccountCircleIcon style={{ fontSize: '150', color: 'white' }} />
          </div>
          <div className="body">
            <form>
              <div
                className="profileDisplay"
                style={{ justifyContent: 'center', marginLeft: '20px' }}
              >
                Name:
                <input
                  type="text"
                  value={userDe.uname}
                  placeholder="UserName"
                  required
                  onChange={this.handleChange}
                  name="email"
                  autoComplete="off"
                />
                <br />
                <br />
                Email:
                <input
                  type="text"
                  value={userDe.email}
                  placeholder="EmailID"
                  required
                  onChange={this.handleChange}
                  name="email"
                  autoComplete="off"
                />
                <br />
                <br />
                City:
                <input
                  type="text"
                  value={userDe.city}
                  placeholder="city"
                  required
                  onChange={this.handleChange}
                  name="city"
                  autoComplete="off"
                />
                <br />
                <br />
                Phno:
                <input
                  type="text"
                  value={userDe.phoneno}
                  placeholder="phone number"
                  required
                  onChange={this.handleChange}
                  name="phone number"
                  autoComplete="off"
                />
                <br />
                <br />
                <div style={{ marginLeft: '30px' }}>
                  <button className="buttoncss" onClick={this.handleSub}>
                    Update
                  </button>
                  <button className="buttoncss" onClick={this.shiftToLogin}>
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default MyAccount;
