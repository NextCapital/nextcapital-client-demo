import PropTypes from 'prop-types';
import React from 'react';

/**
 * Normalizes color by making it an rgb value
 *
 * @param {string} color the color to normalize
 * @returns {string} the normalized color
 */
const normalizeColor = (color) => {
  if (color.length === 4) {
    const r = color[1];
    const g = color[2];
    const b = color[3];

    return `#${r}${r}${g}${g}${b}${b}`;
  }

  return color;
};

/**
 * A demo of a color swatch
 *
 * @param {object} props React props
 * @returns {React.Component} the color swatch demo
 */
const Swatch = (props) => (
  <div className="demo-swatch">
    <label>
      {props.name}:
      <input
        type="color"
        value={ normalizeColor(props.value) }
        onChange={ (e) => props.onChange(props.name, e.target.value) }
      />
    </label>
  </div>
);

Swatch.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default Swatch;
