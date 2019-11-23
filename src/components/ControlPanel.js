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

const Panel = ({ isOpen, setIsOpen }) => <Modal 
  isOpen={isOpen} style={customStyles}>MODAL
  <button onClick={() => setIsOpen(false)}>close</button>
</Modal>;

export default Panel;
