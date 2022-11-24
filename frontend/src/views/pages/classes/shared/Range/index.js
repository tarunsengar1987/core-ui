import React, { useState } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './Range.module.css';

function Range({ min, max, handleChange, value }) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleInputChange = (e) => {
    handleChange(parseFloat(e.target.value));
  };

  const inlineStyle = {
    backgroundImage: `-webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(${percentage}%, ${isHovered ? 'green' : '#777'}),
      color-stop(${percentage}%, #333)
    )`,
  };

  return (
    <input
      className={stylesheet.range}
      max={max}
      min={min}
      onChange={handleInputChange}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      step="0.01"
      style={inlineStyle}
      type="range"
      value={value}
    />
  );
}

Range.defaultProps = {
  min: 0,
};

Range.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Range;
