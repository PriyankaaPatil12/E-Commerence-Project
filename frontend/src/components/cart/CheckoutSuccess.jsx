import React from 'react';

const CheckoutSuccess = () => {
  const cardStyle = {
    padding: '60px',
    display: 'inline-block',
    margin: '0 auto',
  };

  const circleStyle = {
    borderRadius: '50%',
    height: '200px',
    width: '200px',
    background: '#F8FAF5',
    margin: '0 auto',
  };

  const iconStyle = {
    color: '#9ABC66',
    fontSize: '100px',
    lineHeight: '200px',
    marginLeft: '-15px',
  };

  const textStyle = {
    color: '#404F5E',
    fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
    fontSize: '20px',
    margin: '0',
  };

  const headingStyle = {
    color: '#88B04B',
    fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
    fontWeight: '900',
    fontSize: '40px',
    marginBottom: '10px',
  };

  return (
    <div style={cardStyle}>
      <div style={circleStyle}>
        <i style={iconStyle}>✓</i>
      </div>
      <h1 style={headingStyle}>Success</h1>
      <p style={textStyle}>
        We received your purchase request;
        <br />
        we'll be in touch shortly!
      </p>
    </div>
  );
};

export default CheckoutSuccess;
