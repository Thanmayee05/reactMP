import React from 'react';
import './loginpage.css';

const Marker = (props: any) => {
    const { color, name, id } = props;
    return (
      <div className="markerBlock"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;