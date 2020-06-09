import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
//import {showMarkerinLoc} from './Home';
//import { Zoom } from '@material-ui/core';

class SimpleMap extends Component{
  static defaultProps={
    center: {lat:17.387140,lng:78.491684},
    zoom: 15
  }
    render(){
      return (
        <div style={{ height: '600px', width: '900px' , marginTop:'20px'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBis2xi_3iI-dRw9A8GeY71myhp0DNTXHo' }}
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
