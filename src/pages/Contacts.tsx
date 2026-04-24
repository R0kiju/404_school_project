import React, { useState } from 'react';

const Contacts: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="page">
      <div className="section-title"><h2>Связаться с нами</h2></div>
      <div className="grid-2">
        <div className="info-card">
          <h3>Наши контакты</h3>
          <div style={{ marginTop: 20 }}>
            <p><strong>Email:</strong> support@404school.com</p>
            <p><strong>Телефон:</strong> +7 775 661 43 80</p>
            <p><strong>Адрес:</strong> ул. Орлыкол, 14/3, Колледж Управления</p>
          </div>
          <div className="support-card card" style={{ marginTop: 24 }}>
            <h4>Техподдержка</h4>
            <p>Работаем 24/7 для решения ваших вопросов по доступу к материалам.</p>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Форма обратной связи</h3>
          {sent ? (
            <div className="message success">Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input placeholder="Ваше имя" required />
              <input type="email" placeholder="Ваш Email" required />
              <textarea placeholder="Ваше сообщение или вопрос..." required />
              <button className="btn-primary" type="submit" style={{ width: '100%' }}>Отправить</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contacts;
