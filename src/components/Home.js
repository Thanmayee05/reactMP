import React, { Component } from 'react';
import fire, { storage } from '../config/Fire';
import { GoogleComponent } from 'react-google-location';
import Map from './Map';
import { Redirect } from 'react-router-dom';
const API_KEY = 'AIzaSyDprftdVU4M9RKlH31yZqrPNO5Rj-Y6AK';

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
      //ref : '',
    };
  }

  logout = () => {
    console.log('Sending a logout request to the API...');
    this.setState({ loginStatus: false });
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
    navigator.geolocation.getCurrentPosition(position =>
      this.setState({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      })
    );
  }

  showMarkerinLoc() {
    navigator.geolocation.getCurrentPosition(position =>
      this.setState({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      })
    );
    //const long=this.state.long;
    //const lat=this.state.lat;
    //return long,lat;
  }

  onchange = e => {
    console.log(e.target.name);
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    console.log(this.state);
  };

  /*handleMarker = event => {
    event.preventDefault();
    const { lng, lat } = this.state;
    const newElement = { lat: lat, lng: lng };
    this.setState({
      markerslist: [...this.state.markerslist, newElement],
    });
    const keyId=fire.auth().currentUser.uid;
    this.setState({ ref:fire.firestore().collection('coordinates2').doc(keyId)})
    this.ref.collection('markers2')
      .set({
        lng,
        lat,
      })
      .then(docRef => {
        this.setState({
          lng: '',
          lat: '',
        });
        //this.props.history.push("/")
        window.alert('Added marker');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        window.alert('Error adding');
      });
  };*/

//The above Handle Marker is replaced because userid can now be stored as doc id.  
  handleMarker = event => {
    event.preventDefault();
    const keyId=fire.auth().currentUser.uid;
    const db=fire.firestore();
    const { lng, lat } = this.state;
    const newElement = { lat: lat, lng: lng };
    this.setState({
      markerslist: [...this.state.markerslist, newElement],
    });
    db.collection('UserDetails').doc(keyId).collection('Markers').doc()
      .set({
        lng,
        lat,
      })
      .then(docRef => {
        this.setState({
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
      db.collection('coordinates').doc(keyId)
      .set({
        lng,
        lat,
      })
      .then(docRef => {
        this.setState({
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

  /*getSubCollection()
  {
    const db=fire.firestore();
    var docRef = db.collection('coordinates/doc/markers2').doc();
    docRef.get().then(function(doc) {
    if (doc.exists) {
        window.alert("exists");
        console.log("Document data:", doc.data());
    } else {
        //doc.data() will be undefined in this case
        console.log("No such document!");
        window.alert("not reachable");
    }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }*/ //this is not working :(
  handleChange = event => {
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
      });
    }.bind(this);
    console.log(url);
  };

  handleUpload = () => {
    const { image } = this.state;
    const newId = fire.auth().currentUser.uid;
    if (image) {
      const uploadTask = storage
        .ref(`images/${newId}/${image.name}`)
        .put(image);
      uploadTask.on(
        'state_changed',
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
          window.alert('Error in submission.');
        },
        () => {
          // complete function ...
          storage
            .ref('images/' + newId)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ imgSrc: url });
              window.alert('Uploaded successfully');
              window.location.reload(false);
            });
        }
      );
    } else {
      window.alert('Please select your File!');
    }
  };

  render() {
    if (this.state.loginStatus === false) {
      return <Redirect to='/login' />;
    }

    return (
      <div>
        <div>
          <div className='mapsbg'>
            <div style={{ textAlign: 'center', fontSize: '40px' }}>
              Welcome User!
              <button
                onClick={this.logout}
                style={{
                  float: 'right',
                  marginRight: '50px',
                  marginTop: '30px',
                }}
              >
                Logout
              </button>
              <button
                onClick={this.position}
                style={{ float: 'left', marginLeft: '10px', marginTop: '30px' }}
              >
                Get Current Location
              </button>
            </div>
            <br />
            <div>
              <GoogleComponent
                apiKey={API_KEY}
                language={'en'}
                country={'country:in'}
                coordinates={true}
                locationBoxStyle={'custom-style'}
                locationListStyle={'custom-style-list'}
                onChange={e => {
                  this.setState({
                    place: e,
                    lat: e.coordinates.lat,
                    lng: e.coordinates.lng,
                  });
                }}
              />
            </div>
            <div className='imgUpload' style={{ marginLeft: '80px' }}>
              <Map
                google={this.props.google}
                center={{ lat: this.state.lat, lng: this.state.lng }}
                width='800px'
                height='500px'
                zoom={12}
              />
              <br />
              <div
                style={{ float: 'right', position: 'relative', margin: '50px' }}
              >
                <input
                  className='inputType'
                  type='file'
                  onChange={this.handleChange}
                  name='user[image]'
                  ref='file'
                  // multiple='false'
                />
                <br />
                <br />
                <img
                  src={
                    this.state.imgSrc ||
                    'https://via.placeholder.com/400x300?text=Your+Image+will+be+displayed+here'
                  }
                  alt='Uploaded Images'
                  width='400'
                  height='300'
                />
                <br />
                <br />
                <button onClick={this.handleUpload}> Upload </button>
                <br />
                lat:
                <input
                  type='text'
                  value={this.state.lat}
                  placeholder='latitude'
                  name='lat'
                  onChange={this.onchange}
                ></input>
                <br />
                long:
                <input
                  type='text'
                  value={this.state.lng}
                  placeholder='longitude'
                  name='lng'
                  onChange={this.onchange}
                ></input>
                <br />
                <button onClick={this.handleMarker}>Add Marker</button>
                <br />
                <button onClick={this.delete.bind(this, this.state.key)}>
                  Delete
                </button>
                <button onClick={this.getSubCollection}>
                  getData
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
