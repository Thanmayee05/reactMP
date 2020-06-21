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
    //window.alert('reached 1');
    //const {uname,email,phoneno,city}=this.state;
    const keyId = fire.auth().currentUser.uid;
    window.alert(keyId);
    db.collection('UserDetails').doc(keyId).collection('Markers')
      .get().then(snapshot => {
        window.alert('reached2');
        snapshot.forEach(doc => {
          udata.push({ lat: doc.lat, lng: doc.lng });
        });
        const { lng, lat } = this.state;
        const newElement = { lat: lat, lng: lng };
        this.setState({
          markerslist: [...this.state.markerslist, newElement],
        });
        //this.setState({ markerslist: udata });
      })
      .catch(error => {
        window.alert('not reached!');
      });
  }; // worked till some extent!

  /*getmarkersList = event => {
    const db = fire.firestore();
    let udata = [];
    window.alert('reached 1');
    //const {uname,email,phoneno,city}=this.state;
    window.alert('REached 2');
    const keyId = fire.auth().currentUser.uid;
    window.alert(keyId);
    const ref=db.collection('UserDetails').doc(keyId).collection('Markers');
      ref.get().doc().then(doc => {
        window.alert('reached');
        snapshot.forEach(doc => {
          udata.push({ lat: doc.udata().lat, lng: doc.udata().lng });
        });
        if(doc.exists)
        {
          this.setState({lat:doc.data().lat,lng:doc.data().lng});
        }
        //this.setState({ markerslist: udata });
      })
      .catch(error => {
        window.alert('not reached!');
      });*/
  
  
 

  getProfiledata = event => {
    const db = fire.firestore();
    //const fireInstance = fire.firestore().instance;
    let data = [];
    //window.alert("reached");
    //const { uname, email, phoneno, city, lat, lng } = this.state;
    const keyId = fire.auth().currentUser.uid;
    db.collection('UserDetails')
      .doc(keyId)
      .get()
      .then(response => {
        window.alert('reached1');
        response.documents.forEach((result, key) => {
          data.push({
            uname: result.data().uname,
            email: result.data().email,
            phoneno: result.data().phoneno,
            city: result.data().city,
          });
          console.log(result.data().uname);
        });
        this.setState({ userDe: [...this.state.userDe, data] });
      });
      /*const keyId = fire.auth().currentUser.uid;
    fire
      .firestore()
      .collection("UserDetails")
      .doc(keyId)
      .get()
      .then((response) => {
        window.alert("Reached then");
        console.log("EEEEEEE",response);
        const Marks = [];
        response.forEach((document) => {
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
      });*/
  };


  // YOOO!! Haan!
  shiftToLogin=(event)=>
    {
      this.setState({...this.state, msg:false});
    };
  
  render() 
  {
    
    if(this.state.msg===false)
    {
      return <Redirect to='/mapsPage'/>;
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


