// HomeButton.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { FaHome } from 'react-icons/fa';

const HomeButton = () => {
  const buttonStyle = {
    position: 'fixed',
    bottom: '50px',
    right: '20px',
    zIndex: 999,
    background: '#b22234',
    border: 'none',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  };

  const buttonJsx = (
    <a href="#top" style={buttonStyle}>
      <FaHome color="white" size={30} />
    </a>
  );

  return ReactDOM.createPortal(buttonJsx, document.body);
};

export default HomeButton;
