import React from 'react';

const Header = () => {
  return (
    <header className="w-full p-6 bg-transparent">
      <div className="flex items-center gap-2">
        {/* Substitua pelo caminho real da imagem no seu projeto */}
        <img 
          src="/logo-ufrn-musica.png" 
          alt="UFRN - Escola de Música" 
          className="h-10 md:h-12 object-contain"
        />
      </div>
    </header>
  );
};

export default Header;