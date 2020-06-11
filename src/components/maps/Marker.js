import React from 'react';

const Marker = props => {
  const { color, name } = props;
  return (
    <div
      className='markerBlock'
      style={{ backgroundColor: color, cursor: 'pointer' }}
      title={name}
    />
  );
};

export default Marker;