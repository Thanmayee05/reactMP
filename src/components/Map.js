import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const SimpleMap = (props: any) => {
    const [center, setCenter] = useState({lat: 17.387140, lng: 78.491684});
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '600px', width: '900px' , marginTop:'20px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyANrdYhelVz0--nvOP1Ov9556d7xCoI_gE' }}
          defaultCenter={center}
          defaultZoom={15}
        >
          <Marker
            lat={17.387140}
            lng={78.491684}
            name="My Marker"
            color="red"
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;