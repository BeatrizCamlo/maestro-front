import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errorMsg) setErrorMsg(""); 
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro na autenticação:", error);
      if (!error.response) {
        setErrorMsg("Não foi possível conectar ao servidor. Verifique sua conexão.");
      } else if (error.response.status === 401) {
        setErrorMsg("Usuário ou senha incorretos. Tente novamente.");
      } else if (error.response.status === 403) {
        setErrorMsg("Acesso negado. Sua conta pode estar inativa.");
      } else {
        setErrorMsg("Ocorreu um erro inesperado no sistema Maestro.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 font-sans">
      <div className="bg-neutral-white p-8 rounded-2xl shadow-2xl w-full max-w-[400px] flex flex-col items-center relative mt-16">
        <div className="absolute -top-12 bg-primary-dark rounded-full p-6 border-[10px] border-neutral-extra-light shadow-md">
          <svg className="w-10 h-10 text-neutral-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>

        <form className="w-full space-y-5 mt-8" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="bg-danger-pale border border-danger-light text-danger-dark px-4 py-2 rounded-md text-[11px] font-bold text-center animate-pulse">
              {errorMsg}
            </div>
          )}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
               <i className="fas fa-envelope opacity-70"></i>
            </span>
            <input 
              name="username"
              type="text" 
              placeholder="Usuário" 
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-neutral-extra-light rounded focus:outline-none focus:ring-2 focus:ring-primary-light transition-all placeholder-neutral-medium text-neutral-darkest"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
               <i className="fas fa-lock opacity-70"></i>
            </span>
            <input 
              name="password"
              type="password" 
              placeholder="Senha" 
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-neutral-extra-light rounded focus:outline-none focus:ring-2 focus:ring-primary-light transition-all placeholder-neutral-medium text-neutral-darkest"
            />
          </div>

          <div className="text-right">
            <button type="button" className="text-[11px] font-bold text-neutral-darkest hover:underline hover:text-primary-main transition-colors">
              Esqueceu a senha?
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-primary-main text-neutral-white py-3 rounded font-bold uppercase tracking-widest hover:bg-primary-dark transition-colors shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'CARREGANDO...' : 'LOGIN'}
          </button>
        </form>

        <div className="mt-8 text-center text-[11px]">
          <p className="text-neutral-medium">Não tem uma conta?</p>
          <Link to="/register" className="font-bold text-neutral-darkest underline hover:text-primary-main transition-colors">
            Registre-se agora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;