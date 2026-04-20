import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      {/* Card de Login */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-[400px] flex flex-col items-center relative mt-16">
        
        {/* Ícone de Perfil Azul (Círculo) */}
        <div className="absolute -top-12 bg-primary-dark rounded-full p-6 border-[10px] border-neutral-extra-light shadow-md">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>

        <form className="w-full space-y-5 mt-8">
          {/* Input Usuário */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
               <i className="fas fa-envelope opacity-70"></i>
            </span>
            <input 
              type="text" 
              placeholder="Usuário" 
              className="w-full pl-10 pr-4 py-3 bg-neutral-extra-light rounded focus:outline-none focus:ring-2 focus:ring-primary-light transition-all placeholder-neutral-medium"
            />
          </div>

          {/* Input Senha */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
               <i className="fas fa-lock opacity-70"></i>
            </span>
            <input 
              type="password" 
              placeholder="Senha" 
              className="w-full pl-10 pr-4 py-3 bg-neutral-extra-light rounded focus:outline-none focus:ring-2 focus:ring-primary-light transition-all placeholder-neutral-medium"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-[11px] font-bold text-neutral-darkest hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button className="w-full bg-primary-main text-white py-3 rounded font-bold uppercase tracking-widest hover:bg-primary-dark transition-colors shadow-md">
            LOGIN
          </button>
        </form>

        <div className="mt-8 text-center text-[11px]">
          <p className="text-neutral-medium">Não tem uma conta?</p>
            <Link to="/register" className="font-bold text-neutral-darkest underline">
                Registre-se agora
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;