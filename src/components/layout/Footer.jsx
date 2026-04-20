import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-primary-dark text-white py-10 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
        {/* Brasão da UFRN em marca d'água/opacidade reduzida conforme o protótipo */}
        <div className="flex items-center gap-4 opacity-80">
          <img 
            src="/brasao-ufrn-white.png" 
            alt="Brasão UFRN" 
            className="h-14 w-auto grayscale brightness-200 opacity-50"
          />
          <div className="text-left">
            <h3 className="text-sm md:text-base font-semibold leading-tight">
              Sistema Gerenciador de Apresentações Musicais
            </h3>
            <p className="text-[10px] md:text-xs text-blue-200">
              © Escola de Música da Universidade Federal do Rio Grande do Norte
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;