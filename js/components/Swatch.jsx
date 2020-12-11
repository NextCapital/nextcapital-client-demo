import React from 'react';

const normalizeColor = (color) => {
  if (color.length === 4) {
    const r = color[1];
    const g = color[2];
    const b = color[3];

    return `#${r}${r}${g}${g}${b}${b}`;
  }

  return color;
};

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

export default Swatch;
