import React from 'react';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-indigo-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-2.5 rounded-full font-semibold ${bgColor} ${textColor} hover:bg-indigo-700 hover:shadow-md transition-smooth ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;