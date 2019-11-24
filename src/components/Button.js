import React from 'react';

const style = {
  fontSize: 50,
  outline: 'none',
  color: '#fff',
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  padding: '20px',
  width: '350px',
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
