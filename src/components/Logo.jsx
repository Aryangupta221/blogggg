import React from 'react';

function Logo({ width = '100px', className = '' }) {
  return (
    <img
      src="https://www.shutterstock.com/image-vector/blog-writing-line-icon-web-600nw-2366232875.jpg"
      alt="Logo"
      style={{ width }}
      className={`transition-smooth hover:opacity-80 ${className}`}
    />
  );
}

export default Logo;