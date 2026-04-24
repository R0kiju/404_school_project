import React from 'react';
import { PageId } from '../App';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <section className="page">
      <div className="hero-box">
        <h1>404 School — изучай программирование эффективно</h1>
        <p>Современная платформа с курсами, библиотекой и практическими тестами для будущих разработчиков.</p>
        <div className="actions">
          <button className="btn-primary" onClick={() => onNavigate('courses')}>Курсы</button>
          <button onClick={() => onNavigate('library')}>Библиотека</button>
          <button onClick={() => onNavigate('tests')}>Пройти тест</button>
        </div>
        <div className="stats-grid">
          <div className="stat-card card"><h3>8</h3><p>курсов</p></div>
          <div className="stat-card card"><h3>8</h3><p>книг</p></div>
          <div className="stat-card card"><h3>100</h3><p>тестов</p></div>
          <div className="stat-card card"><h3>24/7</h3><p>доступ</p></div>
        </div>
      </div>

      <div className="section-title">
        <h2>Направления обучения</h2>
        <p>Выберите интересующую вас технологию</p>
      </div>
      <div className="grid-3">
        {['HTML/CSS', 'JavaScript', 'SQL', 'Python', 'PHP', 'Design'].map(topic => (
          <div key={topic} className="card">
            <h3>{topic}</h3>
            <p>Профессиональное обучение и практика по направлению {topic}.</p>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="info-card">
          <h3>Об авторе</h3>
          <p><strong>Риккель Владислав Дмитриевич</strong></p>
          <p>Студент 3 курса Колледжа Управления.</p>
        </div>
        <div className="info-card">
          <h3>Технологии проекта</h3>
          <p>Проект построен на <strong>React 18</strong>, <strong>TypeScript</strong> и <strong>Vite</strong>.</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
