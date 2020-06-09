import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
//import {showMarkerinLoc} from './Home';
//import { Zoom } from '@material-ui/core';

class SimpleMap extends Component {
  static defaultProps = {
    center: { lat: 17.38714, lng: 78.491684 },
    zoom: 15,
  };
  render() {
    return (
      <div style={{ height: '600px', width: '900px', marginTop: '20px' }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: 'AIzaSyDprftdVU4M9RKlH31yZqrPNO5Rj-Y6AK' }}
          bootstrapURLKeys={{ key: 'AIzaSyDprftdVU4M9RKlH31yZqrPNO5Rj-Y6AKg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            name='My Marker'
            color='rgb(207, 40, 40)'
          />
        </GoogleMapReact>
      </div>
    );
  }
}
export default SimpleMap;
