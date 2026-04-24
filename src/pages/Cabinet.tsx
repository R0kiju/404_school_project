import React from 'react';
import { useAppContext } from '../context/AppContext';
import { courseProducts, bookProducts } from '../data/mockData';

const Cabinet: React.FC = () => {
  const { user, progress, purchases } = useAppContext();

  if (!user) return <div className="page">Пожалуйста, войдите в систему.</div>;

  const getTitle = (key: string) => {
    const [type, id] = key.split(':');
    if (type === 'course') return courseProducts.find(p => p.id === id)?.title || id;
    if (type === 'book') return bookProducts.find(p => p.id === id)?.title || id;
    return id;
  };

  return (
    <section className="page">
      <div className="section-title"><h2>Личный кабинет</h2></div>
      
      <div className="grid-2">
        <div className="profile-card card">
          <h3>Профиль пользователя</h3>
          <div style={{ marginTop: 16 }}>
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Роль:</strong> {user.role}</p>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Ваш прогресс</h3>
          <div className="table-like" style={{ marginTop: 16 }}>
            {Object.entries(progress).map(([id, p]) => (
              <div key={id} className="table-row">
                <strong>{id.toUpperCase()}</strong>
                <span>{p.completed} / {p.total} заданий</span>
                <span className="badge">{p.score} баллов</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-card" style={{ marginTop: 24 }}>
        <h3>Мои материалы ({purchases.length})</h3>
        <div className="grid-3" style={{ marginTop: 16 }}>
          {purchases.length > 0 ? purchases.map(key => (
            <div key={key} className="card" style={{ padding: 16 }}>
              <strong>{getTitle(key)}</strong>
              <p className="badge" style={{ display: 'block', marginTop: 8 }}>
                {key.startsWith('course') ? 'Курс' : 'Книга'}
              </p>
            </div>
          )) : <p>У вас пока нет приобретенных материалов.</p>}
        </div>
      </div>

      {user.role === 'Администратор' && (
        <div className="info-card admin-panel" style={{ marginTop: 24, border: '2px solid var(--primary)' }}>
          <h3>Панель управления</h3>
          <p>Статистика платформы: 1240 пользователей, 8 активных курсов, 100 тестов.</p>
        </div>
      )}
    </section>
  );
};

export default Cabinet;
