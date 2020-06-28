import React from 'react';

const Marker = props => {
  const { color, name, width,height } = props;
  return (
    <div className='markerBlock'
      style={{ backgroundColor: color, cursor: 'pointer', color:"red", width:width, height:height}}
      title={name}
    />
  );
};

/*const MarkerC = props => {
  const { color, name, width,height } = props;
  return (
    <div className='markerBlock' style={{}}
      style={{ backgroundColor: color, cursor: 'pointer', color:"red", width:width, height:height}}
      title={name}
    />
  );
}*/
export default Marker;
