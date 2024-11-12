import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      console.log('Usuário logado com sucesso:', response.data);
      navigate('/');

    } catch (error) {
      setErrorMessage('Usuário ou senha inválidos');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Nome de usuário</label>
            <input
              type="text"
              id="username"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
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

          <button type="submit" className="login-button"  style={{ backgroundColor: '#4caf50' }}>Entrar</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="links-container">
          <Link to="/forgot-password" className="forgot-password-link">Esqueci minha senha</Link>
          <Link to="/signup" className="signup-link">Não tem conta? Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
