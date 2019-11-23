import React from 'react';

const style = {
  fontSize: 40,
  margin: 20,
  outline: 'none',
  color: '#fff',
};

const Button = ({ isStop, setStop }) => <button
  style={{ 
    ...style, 
    ...({ backgroundColor: isStop ? 'green' : 'red' })
  }}
  onClick={setStop}>
  { isStop ? 'START' : 'STOP' }
</button>

export default Button;
