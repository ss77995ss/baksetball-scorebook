import React, { useState } from 'react';

interface propsType {
  initialValue: number;
}

const AddNumberBtn: React.SFC<propsType> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const handleClick = () => {
    if (value === 0) return;

    setValue(value + 1);
  };

  return <button onClick={handleClick}>+</button>;
};

export default AddNumberBtn;
