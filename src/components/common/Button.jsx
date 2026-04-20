import React from 'react';

const Button = ({ children, variant = 'primary', ...props }) => {
  const styles = {
    primary: "bg-primary-main text-white hover:bg-primary-dark",
    outline: "border border-primary-main text-primary-main hover:bg-primary-ghost",
    danger: "border border-danger-light text-danger-dark hover:bg-danger-pale"
  };

  return (
    <button 
      {...props} 
      className={`${styles[variant]} px-6 py-2 rounded font-bold uppercase tracking-wider transition-colors disabled:opacity-50`}
    >
      {children}
    </button>
  );
};

export default Button;