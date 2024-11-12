import React, { useState } from 'react';
import './css/Esqueceu.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de recuperação de senha
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2 className="form-title">Recuperação de Senha</h2>
        {!submitted ? (
          <>
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
                placeholder="Digite seu email"
                aria-label="Email para recuperação de senha"
              />
            </div>
            <button type="submit" className="submit-button">Enviar email de recuperação</button>
          </>
        ) : (
          <div className="confirmation-message" aria-live="assertive">
            Email de recuperação enviado com sucesso!
          </div>
        )}
        <div className="forgot-password-link">
          <a href="./Login">Voltar para o Login</a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
