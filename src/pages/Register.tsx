import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api'; 
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cpf: '',
    birthDate: '',
    phone: '',
    cellphone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e, fieldName) => {
    const value = e.target ? e.target.value : e; 
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleRegister = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Evita o recarregamento indesejado da página
    }

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Monta o payload unificando o nome completo exigido pelo seu UserInfoDTO do Java
      const payload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`.trim(), 
        cpf: formData.cpf,
        birthDate: formData.birthDate,
        phone: formData.phone,
        cellphone: formData.cellphone
      };

      // Dispara a requisição para a rota correta do Spring Boot
      await api.post('/user-info', payload);

      alert("Conta criada com sucesso!");
      navigate('/login'); // Redirecionamento limpo pós-sucesso

    } catch (error) {
      console.error("Erro completo:", error);
      
      // Captura o erro real devolvido pelo Java, tratando 'message' ou 'mensagem'
      const mensagemErro = error.response?.data?.message || error.response?.data?.mensagem || "Erro ao criar conta. Verifique os dados.";
      alert(`Erro: ${mensagemErro}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-white flex flex-col">
      <main className="flex-grow py-12 px-4 flex justify-center">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl w-full max-w-4xl border border-neutral-extra-light">
          
          <h1 className="text-2xl font-bold text-primary-main mb-8 border-b-2 border-primary-ghost pb-3">
            Criar uma conta
          </h1>
          
          <form className="space-y-6" onSubmit={handleRegister}>
            
            {/* Grid de 2 colunas para informações pessoais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <Input label="Primeiro nome" placeholder="Primeiro nome" value={formData.firstName} onChange={(e) => handleChange(e, 'firstName')} required />
              <Input label="Último nome" placeholder="Último nome" value={formData.lastName} onChange={(e) => handleChange(e, 'lastName')} required />
              
              <Input label="Cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={(e) => handleChange(e, 'cpf')} required />
              <Input label="Data de Nascimento" type="date" value={formData.birthDate} onChange={(e) => handleChange(e, 'birthDate')} required />
              
              <Input label="Telefone" placeholder="(00) 0000-0000" value={formData.phone} onChange={(e) => handleChange(e, 'phone')} />
              <Input label="Celular" placeholder="(00) 90000-0000" value={formData.cellphone} onChange={(e) => handleChange(e, 'cellphone')} required />
            </div>

            {/* Campos de largura total */}
            <div className="space-y-6 border-t border-neutral-extra-light pt-6">
              <Input label="Email" type="email" placeholder="exemplo@email.com" value={formData.email} onChange={(e) => handleChange(e, 'email')} required />
              <Input label="Nome de Usuário" placeholder="Escolha um nome de usuário" value={formData.username} onChange={(e) => handleChange(e, 'username')} required />
            </div>

            {/* Senhas em 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Senha" type="password" placeholder="Digite sua senha" value={formData.password} onChange={(e) => handleChange(e, 'password')} required />
              <Input label="Confirmar senha" type="password" placeholder="Repita a senha" value={formData.confirmPassword} onChange={(e) => handleChange(e, 'confirmPassword')} required />
            </div>

            {/* Ação Principal */}
            <div className="flex justify-center md:justify-end mt-10">
              <Button 
                variant="primary" 
                type="submit"
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