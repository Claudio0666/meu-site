import React from 'react';
import './css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} TeiaTec. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
