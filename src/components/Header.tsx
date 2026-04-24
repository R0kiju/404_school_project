import React from 'react';
import { PageId } from '../App';
import { useAppContext } from '../context/AppContext';
import { User as UserIcon, LogOut } from 'lucide-react';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { user, logout } = useAppContext();

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Главная' },
    { id: 'courses', label: 'Курсы' },
    { id: 'library', label: 'Библиотека' },
    { id: 'tests', label: 'Тестирование' },
    { id: 'about', label: 'О платформе' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <header>
      <div className="container header-inner">
        <div className="logo" onClick={() => onNavigate('home')}>404 School</div>
        <nav>
          {navItems.map(item => (
            <button
              key={item.id}
              className={activePage === item.id ? 'active-nav' : ''}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
          {user && (
            <button
              className={activePage === 'cabinet' ? 'active-nav' : ''}
              onClick={() => onNavigate('cabinet')}
            >
              Личный кабинет
            </button>
          )}
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              <span className="badge">
                <UserIcon size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {user.name}
              </span>
              <button onClick={logout} title="Выйти">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => onNavigate('auth')}>Войти</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
