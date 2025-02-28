import React from 'react';

function Logo({ width = '100px', className = '' }) {
  return (
    <img
      src="https://files.oaiusercontent.com/file-QuybPnLjndGvuT7RNP9QFc?se=2025-02-28T04%3A52%3A25Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dcdb356f5-1cfc-404a-851d-30ca972e957b.webp&sig=dHZxJtaoLfu9sRXWdORQNPjj7NBbsFMkPZoXqftC6BY%3D"
      alt="Logo"
      style={{ width }}
      className={`transition-smooth hover:opacity-80 ${className}`}
    />
  );
}

export default Logo;