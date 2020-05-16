import React, {Component} from 'react';
import fire,{storage} from '../config/Fire';
import { Link } from 'react-router-dom';
import './loginpage.css';
import Map from './Map';
import ReactDOM from "react-dom";

class Home extends Component {

    logout = () => {
      console.log("Sending a logout request to the API...");
      this.setState({ logginStatus: false });
      fire.auth().signOut();
      window.alert("Logging out!");
    }
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('coordinates');
        this.state = {
          image: null,
          imgSrc: "",
          progress: 0,
          markerslist:[],
          long:'',
          lat:'',      
        };
    }
    
    onCollectionUpdate = (querySnapshot) => {
      const markerslist = [];
      querySnapshot.forEach((doc) => {
        const { long,lat } = doc.data();
        markerslist.push({
          key:'',
          doc, // DocumentSnapshot
          long,
          lat,
        });
      });
      this.setState({
        markerslist
      });
    }

    /*componentDidMount() {
      const refr = fire.firestore().collection('coordinates').doc(this.props.match.params.id);
      refr.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            coordinates: doc.data(),
            key: doc.id,
            isLoading: false
          });
        } else {
          console.log("No such document!");
        }
      });
    }*/
    delete(id){
      fire.firestore().collection('coordinates').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        window.alert("deleting marker")
        this.props.history.push("/")
      }).catch((error) => {
        console.error("Error removing document: ", error);
        window.alert("Error deleting");
      });
    }

      handleMarker=(event)=>{
        event.preventDefault();
        const{long,lat}=this.state;
        this.ref.add({
            long,
            lat
          }).then((docRef)=>{
            this.setState({
              long: '',
              lat: ''
            });
            window.alert("Added marker");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            window.alert("Error adding");
          });
        
      }
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
      onchange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({markerslist:state});
      }
    
      handleUpload = () => {
        const { image } = this.state;
        if(image){
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
            .ref("images")
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
      
      
        return (
          <div>
            <div class="header">
                <a href="#home" class="logo"> </a>
                <a href="#default" class="header-left" style={{fontSize:"32px"}}>She<span style={{color:'rgb(8, 49, 231)',fontFamily:'Titillium Web',fontWeight:'bold',fontSize:'36px'}}>Help</span></a>
                <div class="header-right">
                    <a class="active" href="#home">Home</a>
                    <a href="#contact">Contact</a>
                    <a href="#About">About</a>
                </div>
            </div>
            <div>
              <div className="mapsbg">
                <div style={{textAlign:"center",fontSize:'40px'}}>
                    Welcome User!
                    <button onClick={this.logout} style={{float:'right',marginRight:'50px',marginTop:"30px"}}>Logout</button>
                </div>
                <br />
                <div className="imgUpload" style={{marginLeft:"80px"}}>
                  <Map
                    google={this.props.google}
                    center={{lat: 17.387140, lng: 78.491684}}
                    width="800px"
                    height="500px"
                    zoom={15}
                  />
                  <br></br>
                  <div style={{float:'right',position:'relative', margin:"50px"}}>
                    <input className="inputType" type="file" onChange={this.handleChange} 
                        name="user[image]" 
                        ref="file"
                        multiple="false" /><br /><br />
                      <img
                      src={this.state.imgSrc || "https://via.placeholder.com/400x300?text=Your+Image+will+be+dislpayed+here"}
                      alt="Uploaded Images"
                      width="400"
                      height="300"
                      /><br /><br />
                    
                    <button
                      onClick={this.handleUpload}
                    >
                      Upload
                    </button>
                    <br/>
                    lat:
                    <input
                    type="text"
                    value={this.state.lat}
                    placeholder="latitude"
                    name="lat"
                    onChange={this.onchange}>
                    </input>
                    <br></br>
                    long:
                    <input
                    type="text"
                    value={this.state.long}
                    placeholder="longitude"
                    name="long"
                    onChange={this.onchange}
                    >
                    </input>
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

const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement);
export default Home