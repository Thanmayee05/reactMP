import React, {Component} from 'react';
import fire,{storage} from '../config/Fire';
import './loginpage.css';
import Map from './Map';

class Home extends Component {

    logout = () => {
        fire.auth().signOut();
    }

    constructor(props) {
        super(props);
        this.state = {
          image: null,
          imgSrc: "",
          progress: 0          
        };
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
                        multiple="true" /><br /><br />
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
                  </div>
                    
                  </div>         
                </div>
              </div>
            </div>
        );
    }
}


export default Home