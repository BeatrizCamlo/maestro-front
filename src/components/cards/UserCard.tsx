import React from 'react';
import Button from '../common/Button';

const UserCard = ({ name, email, role }) => {
  return (
    <div className="bg-neutral-extra-light p-6 rounded-lg shadow-sm flex items-start gap-4 max-w-sm">
      <div className="bg-primary-dark rounded-full p-3">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-neutral-darkest">{name}</h4>
        <p className="text-xs text-neutral-medium">{email}</p>
        <p className="text-xs italic text-neutral-dark mb-4">{role}</p>
        <div className="flex gap-2">
          <Button variant="danger">Excluir</Button>
          <Button variant="outline">Editar</Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;