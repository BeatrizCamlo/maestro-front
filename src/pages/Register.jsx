import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Register = () => {
  return (
    <div className="min-h-screen bg-neutral-white flex flex-col">
      <main className="flex-grow py-12 px-4 flex justify-center">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl w-full max-w-4xl border border-neutral-extra-light">
          
          {/* Título com a cor primária do seu Style Guide */}
          <h1 className="text-2xl font-bold text-primary-main mb-8 border-b-2 border-primary-ghost pb-3">
            Criar uma conta
          </h1>
          
          <form className="space-y-6">
            {/* Grid de 2 colunas para informações pessoais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <Input label="Primeiro nome" placeholder="Primeiro nome" />
              <Input label="Último nome" placeholder="Último nome" />
              
              <Input label="Cpf" placeholder="000.000.000-00" />
              <Input label="Data de Nascimento" type="date" />
              
              <Input label="Telefone" placeholder="(00) 0000-0000" />
              <Input label="Celular" placeholder="(00) 90000-0000" />
            </div>

            {/* Campos de largura total */}
            <div className="space-y-6 border-t border-neutral-extra-light pt-6">
              <Input label="Email" type="email" placeholder="exemplo@email.com" />
              <Input label="Nome de Usuário" placeholder="Escolha um nome de usuário" />
            </div>

            {/* Senhas em 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Senha" type="password" placeholder="Digite sua senha" />
              <Input label="Confirmar senha" type="password" placeholder="Repita a senha" />
            </div>

            {/* Ação Principal */}
            <div className="flex justify-center md:justify-end mt-10">
              <Button 
                variant="primary" 
                className="w-full md:w-64 py-4 text-lg"
              >
                Criar conta
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-medium">
            Já possui cadastro? <a href="/login" className="text-primary-main font-bold hover:underline">Faça login</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;