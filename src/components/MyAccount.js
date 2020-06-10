import React, {Component} from 'react';
import fire, { storage } from '../config/Fire';
//import { Redirect } from 'react-router-dom';


class MyAccount extends Component{
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('coordinates');
        this.state = {
          markerslist: [],
          userDe:[],
          lng: '',
          lat: '',
          msg:true,
          uname:'',
          email:'',
          phoneno:'',
          city:'',
        };
      }
      /*UNSAFE_componentWillUpdate()
      {
        this.getProfiledata();
      }*/
      getmarkersList=event=>
      {
        const db=fire.firestore();
        let udata=[];
        window.alert("reached 1");
        //const {uname,email,phoneno,city}=this.state;
        window.alert("REached 2");
        const keyId = fire.auth().currentUser.uid;
        window.alert(keyId);
        db.collection('UserDetails').doc(keyId).collection('Markers').get()
        .then((snapshot)=> {
          window.alert("reached");
          snapshot.forEach((doc) => {
            udata.push({lat:doc.udata().lat,lng:doc.udata().lng});
            });
            this.setState({markerslist: udata});
        })
        .catch(error => {
          window.alert("not reached!");
        });
      }
    getProfiledata = event =>{
        const db=fire.firestore();
        let data=[];
        const {uname,email,phoneno,city,lat,lng}=this.state;
        const keyId = fire.auth().currentUser.uid;
        db.collection('UserDetails').doc(keyId).get()
        .then((snapshot)=> {
          window.alert("reached");
          snapshot.forEach((doc,key) => {
            data.push({uname:doc.data().uname,email:doc.data().email,phoneno:doc.data().phoneno,city:doc.data().city});
            });
            this.setState({userDe: data}); });
      }
    render(){
        const {markerslist,userDe}=this.state;
        return(
            <div className='bgimg'>
                <div className='form_block'>
                    <div className='body'>
                        <form>
                           Name:<br/>
                           {userDe.uname}<br/>
                           Email:<br/>
                           {userDe.email}<br/>
                           City:<br/>
                           {userDe.city}<br/>
                           Phno:<br/>
                           {userDe.phoneno}<br/>
                           <button onClick={this.getmarkersList}>getMyMarkers</button><br/>
                           latitutde:<br/>
                           {this.state.lat}<br/>
                           longitude:<br/>
                           {markerslist.lng}<br/>
                           <button onClick={this.getProfiledata}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    /*componentDidMount()
    {
        this.getmarkersList();
    }*/
}
export default MyAccount;

    