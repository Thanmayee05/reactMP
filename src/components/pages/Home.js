import React, { Component } from 'react';
import fire, { storage } from '../../config/Fire';
import { GoogleComponent } from 'react-google-location';
import Map from '../maps/Map';
import { Redirect } from 'react-router-dom';
import './landing.css';

const API_KEY = 'AIzaSyDprftdVU4M9RKlH31yZqrPNO5Rj-Y6AKg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('coordinates');
    this.state = {
      image: null,
      imgSrc: '',
      progress: 0,
      markerslist: [],
      lng: 78.491684,
      lat: 17.38714,
      message: '',
      loginStatus: true,
      status: true,
      isLoading:false,
      setLoading:false,
      msg: true,
      desc:'',
    };
  }

  logout = () => {
    console.log('Sending a logout request to the API...');
    this.setState({...this.state, loginStatus: false });
    fire.auth().signOut();
    window.alert('Logging out!');
  };
  delete(id) {
    fire
      .firestore()
      .collection('coordinates')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        window.alert('deleting marker');
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
        window.alert('Error deleting');
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({...this.state,
        lng: position.coords.longitude,
      });
      this.setState({...this.state,
        lat: position.coords.latitude,
      });
    });
  }

  /*showMarkerinLoc() {
   navigator.geolocation.getCurrentPosition(position =>
       this.setState({ ...this.state,
         lng: position.coords.longitude})
          lat: position.coords.latitude,
       })
     );
   }*/
   showMarkerinLoc=()=>{
      navigator.geolocation.getCurrentPosition((position)=>
       this.setState({
          lng:position.coords.longitude,
          lat:position.coords.latitude
        }),
      );
      
    }
  onchange = e => {
    console.log(e.target.name);
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleSearchChange = e => {
    console.log(e);
    this.setState({
      ...this.state,
      place: e,
      lat: e.coordinates.lat,
      lng: e.coordinates.lng,
    });
  };
 
  handleMarker = event => {
    //Code for Uploading Image
    const { image } = this.state;
    const newId = fire.auth().currentUser.uid;
    event.preventDefault();
    const db = fire.firestore();
    const { lng, lat } = this.state;
    const newElement = { lat: lat, lng: lng }; 
    if (image) {
      const uploadTask = storage
        .ref(`images/${newId}/${image.name}`)
        .put(image);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ ...this.state, progress });
        },
        error => {
          window.alert('Error in submission.');
        },
        () => {
          // complete function ...
          storage
            .ref('images/' + newId)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ ...this.state, imgSrc: url });
              window.alert('Uploaded successfully');
              window.location.reload(false);
            });
        }
      );
    } else {
      window.alert('Please select your Image!');
      return;
    }

    //Adding Marker
    this.setState({
      markerslist: [...this.state.markerslist, newElement],
    });
    db.collection('UserDetails')
      .doc(newId)
      .collection('Markers')
      .doc()
      .set({
        lng,
        lat,
      })
      .then(docRef => {
        this.setState({...this.state, 
          lng: '',
          lat: '',
        });
        //this.props.history.push("/")
        window.alert('Added marker in col1');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        window.alert('Error adding');
      });

    //the second insertion into coordinates collection
    db.collection('coordinates')
      .doc(newId)
      .collection('Markers')
      .doc()
      .set({
        lng,
        lat,
      })
      .then(docRef => {
        this.setState({...this.state,
          lng: '',
          lat: '',
        });
        //this.props.history.push("/")
        window.alert('Added marker in col2');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        window.alert('Error adding');
      });
  };

  getProfiledata = event => {
    /*const db=fire.firestore();
    const keyId = fire.auth().currentUser.uid;
    db.collection('UserDetails').doc(keyId).collection('Markers').get()
    .then(response => {
      window.alert("reached");
    })
    .catch(error => {
      //setError(error);
      window.alert("not reached!");
    });*/
    this.setState({ ...this.state, msg: false });
  };
  handleChange = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState(() => ({ ...this.state,image }));
    }
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({ ...this.state, 
        imgSrc: [reader.result],
      });
    }.bind(this);
    console.log(url);
  };


  render() {
    if (this.state.loginStatus === false) {
      return <Redirect to='/login' />;
    }
    if (this.state.msg === false) {
      return <Redirect to='/myProfile' />;
    }
    return (
      <div>
        <div>
          <div className='mapsClass'>
            <div style={{ textAlign: 'center', fontSize: '40px' }}>
              Welcome User!
              <button className='buttoncss'
                onClick={this.logout}
                style={{
                  float: 'right',
                  marginRight: '50px',
                  marginTop: '30px',
                }}
              >
                Logout
              </button>
              <button className='buttoncss'
              style={{
                float: 'right',
                marginTop: '30px',
              }}
              onClick={this.getProfiledata}>Profile</button>
              <button
                className="buttoncss"
                onClick={this.showMarkerinLoc}
                style={{float:'right', marginRight: '200px', marginTop: '80px' }}
              >
                Current Location
              </button>
            </div>
            <br/>
            <div className="searchBoxStyle">
              <GoogleComponent
                apiKey={API_KEY}
                language={'en'}
                country={'country:in'}
                coordinates={true}
                locationBoxStyle={'custom-style'}
                locationListStyle={'custom-style-list'}
                onChange={this.handleSearchChange}
              />
            </div>
            <div className='imgUpload' style={{ marginLeft: '80px' }}>

                <Map
                google={this.props.google}
                location={{ lat: this.state.lat, lng: this.state.lng }}
                width='500px'
                height='500px'
                zoom={12}
                markerName={{desc: this.state.desc}}
              />
              
              <br />
              <br/>
              <div
                style={{ float: 'right', position: 'relative', margin: '20px' }}
              >
                <input
                  className='inputType'
                  type='file'
                  onChange={this.handleChange}
                  name='user[image]'
                  ref='file'
                  multiple='true'
                />
                <br />
                <br />
                <div className="imgBorder">
                <img
                  src={
                    this.state.imgSrc ||
                    'https://via.placeholder.com/400x200?text=Your+Image+will+be+displayed+here'
                  }
                  alt='Uploaded Images'
                  width='400'
                  height='200'
                />
                </div>
                <br />
                lat:
                <input
                  type='text'
                  value={this.state.lat}
                  placeholder='latitude'
                  name='lat'
                  onChange={this.onchange}
                ></input>
                long:
                <input
                  type='text'
                  value={this.state.lng}
                  placeholder='longitude'
                  name='lng'
                  onChange={this.onchange}
                ></input>
                <br />
                <button className='buttoncss' onClick={this.handleMarker}>Add Marker</button>
                <br />
              </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Home;
