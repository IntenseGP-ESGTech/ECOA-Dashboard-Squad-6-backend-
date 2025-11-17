import React, { useState } from 'react';
import { FaBuilding, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { register } from './register.js';
const CadastroEmpresa = () => {
  const [formData, setFormData] = useState({
    cnpj: '',
    email: '',
    nomeSocial: '',
    senha: '',
    confirmarSenha: ''
  });
  
  const [registerState, setRegisterState] = useState({
    visible: false,
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterState({visible: false, message:""})
    if(!formData.cnpj || !formData.email || !formData.nomeSocial || !formData.senha || !formData.confirmarSenha){
      setRegisterState({visible: true, message:"Por favor, preencha todos os campos"})
    } else if (formData.senha != formData.confirmarSenha){
      setRegisterState({visible: true, message:"As senhas são divergentes"})
    } else {
      const result = await register(formData.cnpj, formData.email, formData.nomeSocial, formData.senha);
      console.log(result)
      if(result.success == true){
        setRegisterState({visible: true, message:"Usuário criado com sucesso!"})
        setFormData({cnpj: '',
          email: '',
          nomeSocial: '',
          senha: '',
          confirmarSenha: ''})
      } else {
        setRegisterState({visible: true, message:result.erro})
      }
    }

  };

  return (
    <div className="formulario-especifico">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-with-icon">
            <FaBuilding className="input-icon" />
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              className="login-input"
              value={formData.cnpj}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="E-mail Corporativo"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="nomeSocial"
              placeholder="Nome Social"
              className="login-input"
              value={formData.nomeSocial}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campos-senha">
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="senha"
                placeholder="Defina sua Senha"
                className="login-input"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirme sua Senha"
                className="login-input"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="botao-cadastrar">
          Cadastrar
        </button>
      </form>
      {registerState.visible && (<p className="login-welcome-title">{registerState.message}</p>)}
    </div>
  );
};

export default CadastroEmpresa;