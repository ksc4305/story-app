import React from 'react';
import { Select, MenuItem } from '@mui/material';

const SelectField = ({ name, value, onChange, label, options }) => (
  <Select
    name={name}
    value={value}
    onChange={onChange}
    displayEmpty
    style={{ minWidth: 80, marginLeft: 8, marginRight: 8 }}
  >
    <MenuItem value="">
      <em>{label}</em>
    </MenuItem>
    {options.map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
);

export default SelectField;
