import React from 'react';

const btnStyle = {
  display: 'flex',
  
}

const ch = {
  flex: 1,
  border: 'solid 1px black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: '#fed330',
}

const Header = () => <div>
  <div style={btnStyle}>
    <div style={ch}>
      <img src={process.env.PUBLIC_URL + '/logo-name.png'} height="50"/>
    </div>
    <div style={ch}>PUSH UP</div>
    <div style={ch}></div>
  </div>
</div>;

export default Header;
