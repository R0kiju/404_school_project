import React from 'react';

const About: React.FC = () => {
  return (
    <section className="page">
      <div className="section-title"><h2>О платформе 404 School</h2></div>
      <div className="info-card">
        <p style={{ fontSize: 18 }}>404 School — это современная образовательная экосистема, созданная для того, чтобы сделать путь в программирование понятным и структурированным.</p>
        <div className="grid-2" style={{ marginTop: 30 }}>
          <div className="card">
            <h3>Наша миссия</h3>
            <p>Предоставить качественные знания по доступной цене, совмещая глубокую теорию с интенсивной практикой.</p>
          </div>
          <div className="card">
            <h3>Методика</h3>
            <p>Мы верим в обучение через действие. Поэтому каждый курс сопровождается десятками практических тестов.</p>
          </div>
        </div>
        <div className="info-card" style={{ marginTop: 24 }}>
          <h3>Что вы получаете:</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>Доступ к 8 профессиональным курсам.</li>
            <li>Библиотека из 8 книг по смежным темам.</li>
            <li>Более 100 практических заданий с мгновенной проверкой.</li>
            <li>Личный кабинет для отслеживания успеваемости.</li>
            <li>Пожизненный доступ к купленным материалам.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
