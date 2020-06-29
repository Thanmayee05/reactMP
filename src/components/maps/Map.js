import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

class SimpleMap extends Component {
  static defaultProps = {
    center: { lat: 17.38714, lng: 78.491684 },
    zoom: 14,
  };
  render() {
    // console.log(this.props.markerslist);
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
            color="rgb(9, 182, 250)"
            width="9px"
            height="9px"
          />
          {this.props.markerslist?.map((marker, index) => (
            <Marker
              key={index}
              lat={marker.lat}
              lng={marker.lng}
              color="rgb(207, 40, 40)"
              width="10px"
              height="10px"
              name="Danger Zone"
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}
export default SimpleMap;
