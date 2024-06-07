import React from 'react';
import './NameInput.css'

const NameInput = ({ name, setName }) => (
  <div className='name-input-container'>
    <label>
      Name: 
      <input 
        type="text" 
        className='name-input'
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </label>
  </div>
);

export default NameInput;
