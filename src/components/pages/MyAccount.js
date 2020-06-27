import React, { Component } from 'react';
import fire from '../../config/Fire';
import { Redirect } from 'react-router-dom';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('coordinates');
    this.state = {
      markerslist: [],
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

  getmarkersList = event => {
    const db = fire.firestore();
    let udata = [];
    const keyId = fire.auth().currentUser.uid;
    window.alert(keyId);
    db.collection('coordinates')
      .doc(keyId)
      .collection('Markers')
      .get()
      .then(snapshot => {
        window.alert('reached2');
        snapshot.docs.forEach(doc => {
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
      .catch(error => {
        window.alert('not reached!');
      });
    event.preventDefault();
  };

  getProfiledata = event => {
    const keyId = fire.auth().currentUser.uid;
    fire
      .firestore()
      .collection('UserDetails')
      .doc(keyId)
      .get()
      .then(response => {
        window.alert('Reached then');
        const Marks = [];
        response.forEach(document => {
          const Mark = {
            uname: document.uname,
            city: document.city,
            phoneno: document.phoneno,
            email: document.email,
          };
          Marks.push(Mark);
          console.log(Mark.uname);
          console.log(Mark.city);
        });
        this.setState({
          markerslist: Marks,
        });
      });
  };

  shiftToLogin = event => {
    this.setState({ ...this.state, msg: false });
  };
  render() {
    if (this.state.msg === false) {
      return <Redirect to='/mapsPage' />;
    }
    const { markerslist, userDe } = this.state;
    return (
      <div className='bgimg'>
        <div className='form_block'>
          <div className='body'>
            <form>
              Name:
              <br />
              {userDe.uname}
              <br />
              Email:
              <br />
              {userDe.email}
              <br />
              City:
              <br />
              {userDe.city}
              <br />
              Phno:
              <br />
              {userDe.phoneno}
              <br />
              <button onClick={this.getmarkersList}>getMyMarkers</button>
              <br />
              latitutde:
              <br />
              {markerslist.lat}
              <br />
              longitude:
              <br />
              {markerslist.lng}
              <br />
              <button onClick={this.getProfiledata}>Submit</button>
              <button onClick={this.shiftToLogin}>Close</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default MyAccount;