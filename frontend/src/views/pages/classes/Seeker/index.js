import React from 'react';
import PropTypes from 'prop-types';

import convertTime from '../functions/convertTime';
import Range from '../shared/Range';

import stylesheet from './Seeker.module.css';

function Seeker({ currentTime, duration, handleTrackClick,index }) {
  return (
    <div className={stylesheet.seeker}>
      <span className={stylesheet.time}>{convertTime(currentTime)}</span>
      <Range
      max={duration}
        value={currentTime}
        handleChange={handleTrackClick}
      />
      <span className={stylesheet.time}>{convertTime(duration)}</span>
    </div>
  );
}

Seeker.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  handleTrackClick: PropTypes.func.isRequired,
};

export default Seeker;
