import React from 'react';

const Input = ({ label, icon, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-sm font-bold text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full bg-neutral-extra-light p-3 rounded focus:ring-2 focus:ring-primary-main outline-none transition-all ${icon ? 'pl-10' : 'pl-3'}`}
        />
      </div>
    </div>
  );
};

export default Input;