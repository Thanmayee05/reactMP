import React, { Component } from 'react';
import fire, { storage } from '../../config/Fire';
import { GoogleComponent } from 'react-google-location';
import Map from '../maps/Map';
import './landing.css';
import { Redirect } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AddLocationIcon from '@material-ui/icons/AddLocation';

const API_KEY = 'AIzaSyBis2xi_3iI-dRw9A8GeY71myhp0DNTXHo';

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('coordinates');
    this.state = {
      image: null,
      imgSrc: '',
      progress: 0,
      markerslist: [],
      lng: null,
      lat: null,
      message: '',
      loginStatus: true,
      status: true,
      isLoading: false,
      setLoading: false,
      msg: true,
      desc: '',
      udata: [],
    };
  }

  componentDidUpdate() {
    if (this.state.uid) {
      console.log(this.state.uid);
    }
  }

  logout = () => {
    console.log('Sending a logout request to the API...');
    this.setState({ ...this.state, loginStatus: false });
    fire.auth().signOut();
    window.alert('Logging out!');
  };

  setFireBaseAuth = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getmarkersList(user.uid);
      } else {
      }
    });
  };

  getmarkersList = () => {
    const db = fire.firestore();
    const { udata } = this.state;
    db.collection('AllMarkers')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const { lat, lng } = doc.data();
          udata.push({ lat, lng });
        });
        this.setState({ markerslist: udata });
      })
      .catch((error) => {
        window.alert('not reached!');
        console.log(error);
      });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ ...this.state, lng: position.coords.longitude });
      this.setState({ ...this.state, lat: position.coords.latitude });
      this.setFireBaseAuth();
    });
    // this.getmarkersList();
  }

  showMarkerinLoc = () => {
    navigator.geolocation.getCurrentPosition((position) =>
      this.setState({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      })
    );
  };
  onchange = (e) => {
    console.log(e.target.name);
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleSearchChange = (e) => {
    console.log(e);
    this.setState({
      ...this.state,
      place: e,
      lat: e.coordinates.lat,
      lng: e.coordinates.lng,
    });
  };

  handleCheck(val) {
    var v = this.state.markerslist.some((item) => val.lat === item.lat);
    var u = this.state.markerslist.some((item) => val.lng === item.lng);
    if (v === true && u === true) {
      return true;
    } else {
      return false;
    }
  }
  handleMarker = (event) => {
    //Code for Uploading Image
    const { image } = this.state;
    const newId = fire.auth().currentUser.uid;
    event.preventDefault();
    const db = fire.firestore();
    const { lng, lat } = this.state;
    const newElement = { lat: lat, lng: lng };
    if (this.handleCheck(newElement)) {
      window.alert('Marker already existing!');
      return;
    } else {
      if (image) {
        const uploadTask = storage
          .ref(`images/${newId}/${image.name}`)
          .put(image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ ...this.state, progress });
          },
          (error) => {
            window.alert('Error in submission.');
          },
          () => {
            // complete function ...
            storage
              .ref('images/' + newId)
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                this.setState({ ...this.state, imgSrc: url });
                //window.alert('Uploaded Successfully');
                window.location.reload(false);
              });
          }
        );
      } else {
        window.alert('Please Upload Image');
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
        .then((docRef) => {
          this.setState({ ...this.state, lng: '', lat: '' });
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          window.alert('Error adding');
        });

      //the second insertion into coordinates collection
      db.collection('AllMarkers')
        //.doc(newId)
        .doc()
        .set({
          lng,
          lat,
        })
        .then((docRef) => {
          this.setState({ ...this.state, lng: '', lat: '' });
          //this.props.history.push("/")
          window.alert('Marker Added');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          window.alert('Error adding');
        });
    }
  };

  /*getProfiledata = (event) => {
    this.setState({ ...this.state, msg: false });
  };*/
  handleChange = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState(() => ({ ...this.state, image }));
    }
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({ ...this.state, imgSrc: [reader.result] });
    }.bind(this);
    console.log(url);
  };

  render() {
    // console.log(this.state.markerslist);
    if (this.state.loginStatus === false) {
      return <Redirect to="/login" />;
    }
    if (this.state.msg === false) {
      return <Redirect to="/myProfile" />;
    }
    return (
      <div>
        <div>
          <div className="mapsClass">
            <div style={{ textAlign: 'center', fontSize: '40px' }}>
              Welcome User!
              <button
                className="buttoncss"
                onClick={this.logout}
                style={{
                  float: 'right',
                  marginRight: '40px',
                  marginTop: '30px',
                }}
              >
                <ExitToAppIcon style={{ fontSize: '12px' }} /> Logout
              </button>
              <button
                className="buttoncss"
                onClick={this.showMarkerinLoc}
                style={{
                  float: 'right',
                  marginRight: '260px',
                  marginTop: '80px',
                }}
              >
                <LocationOnIcon style={{ fontSize: '12px' }} /> Current Location
              </button>
            </div>
            <br />
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
            <div className="imgUpload" style={{ marginLeft: '80px' }}>
              <Map
                google={this.props.google}
                location={{ lat: this.state.lat, lng: this.state.lng }}
                width="500px"
                height="500px"
                zoom={14}
                markerslist={this.state.markerslist}
              />

              <br />
              <br />
              <div
                style={{ float: 'right', position: 'relative', margin: '20px' }}
              >
                <input
                  className="inputType"
                  type="file"
                  onChange={this.handleChange}
                  name="user[image]"
                  ref="file"
                  // multiple='true'
                />
                <br />
                <br />
                <div className="imgBorder">
                  <img
                    src={
                      this.state.imgSrc ||
                      'https://via.placeholder.com/400x200?text=Your+Image+will+be+displayed+here'
                    }
                    alt="Uploaded Images"
                    width="400"
                    height="200"
                  />
                </div>
                <br />
                lat:
                <input
                  type="text"
                  value={this.state.lat}
                  placeholder="latitude"
                  name="lat"
                  onChange={this.onchange}
                ></input>
                long:
                <input
                  type="text"
                  value={this.state.lng}
                  placeholder="longitude"
                  name="lng"
                  onChange={this.onchange}
                ></input>
                <br />
                <button className="buttoncss" onClick={this.handleMarker}>
                  <div>
                    <AddLocationIcon style={{ fontSize: '15px' }} />
                    Add Marker
                  </div>
                </button>
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
