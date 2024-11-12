import React, { useState } from 'react';
import './css/contato.css';
import Banner1 from './Banner1';
import emailjs from 'emailjs-com';

const Contato = () => {
  const initialFormData = { nome: '', email: '', assunto: '', mensagem: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = ({ target: { name, value } }) =>
    setFormData({ ...formData, [name]: value });

  const resetForm = () => setFormData(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    try {
      // Substitua com suas credenciais do EmailJS
      const response = await emailjs.send(
        'service_7mb392e',   // Substitua com seu SERVICE_ID
        'template_qe8udrp',   // Substitua com seu TEMPLATE_ID
        formData,             // Dados do formulário
        'Teia'                // Substitua com seu USER_ID
      );
      console.log('Mensagem enviada com sucesso!', response.status, response.text);
      setFeedback({ message: 'Mensagem enviada com sucesso!', type: 'success' });
      resetForm();
    } catch (err) {
      console.error('Falha no envio da mensagem:', err);
      setFeedback({ message: 'Falha ao enviar a mensagem. Tente novamente mais tarde.', type: 'error' });
    }
  };

  return (
    <div className="contato-container">
      <Banner1 />
      <p>Entre em contato conosco através do formulário abaixo ou mande-nos um e-mail para <a href="mailto:teiatec2024.1@gmail.com">teiatec2024.1@gmail.com</a></p>
      <p>Responderemos o mais breve possível.</p>
      {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
      <form className="contato-form" onSubmit={handleSubmit}>
        {['nome', 'email', 'assunto', 'mensagem'].map((field) => (
          <FormField key={field} field={field} value={formData[field]} onChange={handleChange} />
        ))}
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
};

const FormField = ({ field, value, onChange }) => (
  <>
    <label htmlFor={field}>{capitalizeFirstLetter(field)}:</label>
    {field !== 'mensagem' ? (
      <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={value} onChange={onChange} required />
    ) : (
      <textarea id={field} name={field} rows="5" value={value} onChange={onChange} required />
    )}
  </>
);

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default Contato;
