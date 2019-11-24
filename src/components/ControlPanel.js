import React from 'react';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Panel = ({ isOpen, setIsOpen, content }) => <Modal 
  isOpen={isOpen} style={customStyles}>{ content }
  <button onClick={() => setIsOpen(false)}>close</button>
</Modal>;

export default Panel;
