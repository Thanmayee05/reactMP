import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

class SimpleMap extends Component {
  static defaultProps = {
    center: { lat: 17.38714, lng: 78.491684 },
    zoom: 14,
  };
  render() {
    return (
      <div style={{ height: '550px', width: '1000px', marginTop: '20px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDprftdVU4M9RKlH31yZqrPNO5Rj-Y6AKg' }}
          defaultCenter={this.props.center}
          center={this.props.location}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={this.props.location.lat}
            lng={this.props.location.lng}
            name={this.props.desc}
            color='rgb(207, 40, 40)'
          />
        </GoogleMapReact>
      </div>
    );
  }
}
export default SimpleMap;
