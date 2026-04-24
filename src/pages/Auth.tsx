import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { api } from '../api';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const { setUser } = useAppContext();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = isRegister 
        ? await api.register(form.name, form.email, form.password)
        : await api.login(form.email, form.password);

      if (res.error) {
        setError(res.error);
      } else {
        localStorage.setItem('school404Token', res.token);
        localStorage.setItem('school404User', JSON.stringify(res.user));
        setUser(res.user);
        onLogin();
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    }
  };

  return (
    <section className="page">
      <div className="section-title" style={{ textAlign: 'center' }}>
        <h2>{isRegister ? 'Регистрация' : 'Вход'} в 404 School</h2>
      </div>
      
      <div className="auth-card card" style={{ maxWidth: 400, margin: 'auto' }}>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input 
              placeholder="Ваше имя" 
              required 
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            required 
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <button className="btn-primary" type="submit" style={{ width: '100%' }}>
            {isRegister ? 'Создать аккаунт' : 'Войти'}
          </button>
        </form>
        
        {error && <div className="message danger">{error}</div>}
        
        <button 
          style={{ width: '100%', marginTop: 12, background: 'none', boxShadow: 'none', border: 'none' }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>

        {!isRegister && (
          <p style={{ marginTop: 20, fontSize: 13, textAlign: 'center', color: 'var(--muted)' }}>
            Для входа как админ: <strong>admin@admin.com / admin</strong> (если уже создан) или просто введите admin/admin при регистрации.
          </p>
        )}
      </div>
    </section>
  );
};

export default Auth;
