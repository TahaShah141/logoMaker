import React, { useState } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

const CustomColorPicker = ({onChange, color}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    onChange(newColor)
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: 'full',
        height: '100%',
        borderRadius: '2px',
        background: color,
      },
      swatch: {
        height: '100%',
        padding: '3px',
        background: '#fff',
        borderRadius: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        aspectRatio: '1 / 1',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div className='h-full w-full text-black'>
      {displayColorPicker ? (
        <div style={styles.popover} className='translate-y-[-105%]'>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}

      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
    </div>
  );
};

export default CustomColorPicker;
