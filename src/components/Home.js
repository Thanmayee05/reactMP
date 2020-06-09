import React, {Component} from 'react';
import fire,{storage} from '../config/Fire';
import { GoogleComponent } from "react-google-location";
import './loginpage.css';
import Map from './Map';
import { Redirect} from 'react-router-dom';
const API_KEY = "AIzaSyDprftdVU4M9RKlH31yZqrPNO5Rj-Y6AKg";

class Home extends Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('coordinates');
        this.state = {
          image: null,
          imgSrc: "",
          progress: 0,
          markerslist:[],
          long:78.491684,
          lat:17.387140, 
          message:'',
          logginStatus:true,
          mStatus:false   
        };
    }
    logout = () => {
      console.log("Sending a logout request to the API...");
      this.setState({ logginStatus: false });
      fire.auth().signOut()
      window.alert("Logging out!");
    }
    delete(id) {
      fire
        .firestore()
        .collection("coordinates")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          window.alert("deleting marker");
          this.props.history.push("/");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          window.alert("Error deleting");
        });
    }
    showMarkerinLoc()
    {
      navigator.geolocation.getCurrentPosition((position)=>
       this.setState({
          long:position.coords.longitude,
          lat:position.coords.latitude
        }),
      );
      //const long=this.state.long;
      //const lat=this.state.lat;
      //return long,lat;
    }
    onchange = (e) => {
      const state = this.state
      state[e.target.name] = e.target.value;
      this.setState({markerslist:state});
    }
    handleMarker = e => {
      e.preventDefault();
      const keyId=fire.auth().currentUser.uid;
      const db = fire.firestore();
      /*db.settings({
        timestampsInSnapshots: true
      });*/
      const {long,lat}=this.state;
      db.collection('coordinates').doc(keyId).set({
        long,
        lat
      }).then(()=>{
        this.setState({
          long: '',
          lat: ''
        });
        window.alert("added");
      }).catch((error) => {
        console.error("Error adding document: ", error);
        window.alert("Error adding");
      }); 
    };
      handleChange = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }));
        }
        var file = this.refs.file.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result],
                })
            }.bind(this);
        console.log(url)
      };
      /*mapStatus=(event)=>{
        const {lat,long}=this.state;
        if(this.mStatus===true)
        {
          lat=this.state.lat,
          long=this.state.long
        }
      }*/
      handleUpload = () => {
        const { image } = this.state;
        const newId = fire.auth().currentUser.uid;
        if(image){
          const uploadTask = storage.ref(`images/${newId}/${image.name}`).put(image);
        uploadTask.on(
        "state_changed",
        snapshot => {
            // progress function ...
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
        },
        error => {
            // Error function ...
            console.log(error);
            window.alert("Error in submission.")
        },
        () => {
            // complete function ...
            storage
            .ref("images/"+newId)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                this.setState({ imgSrc:url });
            window.alert("Uploaded successfully");
            window.location.reload(false);
            });
         });
        }
        else{
          window.alert("Please select your File!")
        }
      };
    render() {
        if(this.state.logginStatus===false)
        {
          return <Redirect to='/login'/>;
        }  
        return (
          <div>
            <div>
              <div className="mapsbg">
                <div style={{textAlign:"center",fontSize:'40px'}}>
                    Welcome User!
                    <button onClick={this.logout} style={{float:'right',marginRight:'50px',marginTop:"30px"}}>Logout</button>
                    <button onClick={this.position} style={{float:'left', marginLeft:'10px', marginTop:'30px'}}> Get Current Location </button>
                </div>
                <br />
                <div>
                  <GoogleComponent
                    apiKey={API_KEY}
                    language={"en"}
                    country={"country:in|country:us"}
                    coordinates={true}
                    locationBoxStyle={"custom-style"}
                    locationListStyle={"custom-style-list"}
                    onChange={(e) => {
                      this.setState({
                        place: e,
                        lat: e.coordinates.lat,
                        long: e.coordinates.lng,
                        mapStatus:true,
                      });
                    }}
                  />
                </div>
                <div className="imgUpload" style={{marginLeft:"80px"}}>
                    <Map
                      google={this.props.google}
                      center={{lat: this.state.lat, lng: this.state.long}}
                      width="800px"
                      height="500px"
                      zoom={15}
                    />                    
                  <br/>
                  <div style={{float:'right',position:'relative', margin:"50px"}}>
                    <input className="inputType" type="file" onChange={this.handleChange} 
                        name="user[image]" 
                        ref="file"
                        multiple="false" /><br /><br />
                      <img
                      src={this.state.imgSrc || "https://via.placeholder.com/400x300?text=Your+Image+will+be+displayed+here"}
                      alt="Uploaded Images"
                      width="400"
                      height="300"
                      /><br /><br />
                    
                    <button
                      onClick={this.handleUpload}> Upload </button>
                    <br/>
                    lat:
                    <input
                      type="text"
                      value={this.state.lat}
                      placeholder="latitude"
                      name="lat"
                      onChange={this.onchange}
                    ></input>
                    <br></br>
                    long:
                    <input
                      type="text"
                      value={this.state.long}
                      placeholder="longitude"
                      name="long"
                      onChange={this.onchange}
                    ></input>
                    <br/>
                    <button
                      onClick={this.handleMarker}
                    >Add Marker</button>
                    <br></br>
                    <button
                      onClick={this.delete.bind(this,this.state.key)}
                    >Delete</button>
                  </div>
                  </div>         
                </div>
              </div>
            </div>
        );
    }
}
export default Home;