import React from 'react';
import { PageId } from '../App';
import { 
  ArrowRight, 
  Code2, 
  Cpu, 
  Database, 
  Layers, 
  Layout, 
  Terminal, 
  Sparkles,
  Zap,
  ShieldCheck,
  Users
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <section className="page home-landing">
      {/* Hero Section */}
      <div className="hero-premium">
        <div className="hero-tagline">
          <Sparkles size={16} className="icon-gold" />
          <span>Новый стандарт IT-образования</span>
        </div>
        <h1 className="hero-title">
          Освой будущее <br />
          через <span className="text-gradient">практику</span>
        </h1>
        <p className="hero-subtitle">
          404 School — это экосистема для тех, кто не боится ошибок. 
          Мы превращаем теорию в прикладные навыки с помощью интерактивных курсов и тестов.
        </p>
        <div className="hero-actions">
          <button className="btn-primary-large" onClick={() => onNavigate('courses')}>
            Начать путь бесплатно
            <ArrowRight size={20} />
          </button>
          <button className="btn-secondary-blur" onClick={() => onNavigate('library')}>
            Смотреть библиотеку
          </button>
        </div>

        {/* Floating Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-num">12+</span>
            <span className="stat-label">Курсов</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">500+</span>
            <span className="stat-label">Тестов</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">24/7</span>
            <span className="stat-label">Доступ</span>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="section-container">
        <div className="section-header-centered">
          <h2 className="section-title-large">Почему выбирают нас</h2>
          <p className="section-desc">Мы создали инструменты, которые делают обучение естественным процессом</p>
        </div>
        
        <div className="grid-3">
          <div className="feature-card">
            <div className="feature-icon-box purple">
              <Zap size={24} />
            </div>
            <h3>Быстрый старт</h3>
            <p>Никакой лишней воды. Только те знания, которые требуются на реальных проектах прямо сейчас.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box blue">
              <ShieldCheck size={24} />
            </div>
            <h3>Валидация навыков</h3>
            <p>Пройдите тестирование по каждой теме и получите подтверждение своих компетенций.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box green">
              <Users size={24} />
            </div>
            <h3>Сообщество</h3>
            <p>Обменивайтесь опытом с единомышленниками и растите вместе в профессиональной среде.</p>
          </div>
        </div>
      </div>

      {/* Tracks Section */}
      <div className="section-container">
        <div className="section-header-left">
          <h2 className="section-title-large">Направления обучения</h2>
          <p className="section-desc">Выбирайте свой стек и начинайте погружение</p>
        </div>
        
        <div className="grid-track">
          {[
            { title: 'Frontend Core', icon: Layout, color: '#61dafb', desc: 'HTML5, CSS3, Modern JavaScript и архитектура React.' },
            { title: 'Backend Systems', icon: Terminal, color: '#4caf50', desc: 'Node.js, создание API, безопасность и масштабируемость.' },
            { title: 'Data Management', icon: Database, color: '#ff9800', desc: 'Реляционные базы данных, SQL запросы и оптимизация данных.' },
            { title: 'UI/UX Design', icon: Layers, color: '#f44336', desc: 'Принципы дизайна, прототипирование и работа в Figma.' },
            { title: 'Computer Science', icon: Cpu, color: '#9c27b0', desc: 'Алгоритмы, структуры данных и основы архитектуры ЭВМ.' },
            { title: 'Fullstack Dev', icon: Code2, color: '#2196f3', desc: 'Комплексное создание веб-приложений от идеи до деплоя.' },
          ].map((track, i) => (
            <div key={i} className="track-card">
              <div className="track-header">
                <track.icon size={32} color={track.color} />
                <div className="track-dot" style={{ backgroundColor: track.color }} />
              </div>
              <h3>{track.title}</h3>
              <p>{track.desc}</p>
              <div className="track-footer">
                <span>Подробнее</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Author Section */}
      <div className="author-banner">
        <div className="author-content">
          <div className="author-badge">Создатель проекта</div>
          <h2>Риккель Владислав Дмитриевич</h2>
          <p>Студент 3 курса Колледжа Управления. Разрабатываю платформу как дипломный проект, ориентируясь на стандарты индустрии и лучший пользовательский опыт.</p>
          <div className="tech-stack-mini">
            <span>React 18</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>SQLite</span>
          </div>
        </div>
        <div className="author-image-placeholder">
          <Code2 size={120} strokeWidth={1} opacity={0.2} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-final">
        <h2>Готовы начать?</h2>
        <p>Присоединяйтесь к 404 School сегодня и получите доступ ко всем ресурсам бесплатно.</p>
        <button className="btn-primary-large" onClick={() => onNavigate('auth')}>
          Создать аккаунт
        </button>
      </div>
    </section>
  );
};

export default Home;
