import React from 'react';

const Marker = props => {
  const { color, name } = props;
  return (
    <div className='markerBlock'
      style={{ backgroundColor: color, cursor: 'pointer', color:"red" }}
      title={name}
    />
  );
};

export default Marker;
