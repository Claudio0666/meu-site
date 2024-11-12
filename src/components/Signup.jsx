import React, { useState } from 'react';
import axios from 'axios';
import './css/Register.css'; // Importando o CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });
      console.log('Usuário cadastrado com sucesso:', response.data);
      setSuccessMessage('Usuário cadastrado com sucesso!');
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Email já cadastrado');
      } else {
        console.error('Erro ao fazer registro:', error);
        setErrorMessage('Erro ao fazer registro');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registrar</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="username">Nome de usuário</label>
            <input
              type="text"
              id="username"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">Registrar</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
        <div className="links-container">
          <a href="./Login" className="back-to-login-link">Voltar para o Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
