import React from 'react';
import { PageId } from '../App';
import { useAppContext } from '../context/AppContext';
import { 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  BookOpen, 
  Library as LibraryIcon, 
  ClipboardCheck, 
  Info, 
  Mail,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { user, logout } = useAppContext();

  const navItems = [
    { id: 'home' as PageId, label: 'Главная', icon: LayoutDashboard },
    { id: 'courses' as PageId, label: 'Курсы', icon: BookOpen },
    { id: 'library' as PageId, label: 'Библиотека', icon: LibraryIcon },
    { id: 'tests' as PageId, label: 'Тесты', icon: ClipboardCheck },
  ];

  const secondaryNav = [
    { id: 'about' as PageId, label: 'О нас', icon: Info },
    { id: 'contacts' as PageId, label: 'Контакты', icon: Mail },
  ];

  return (
    <header className="main-header">
      <div className="container header-inner">
        <div className="header-left">
          <div className="logo-wrapper" onClick={() => onNavigate('home')}>
            <div className="logo-icon">404</div>
            <span className="logo-text">School</span>
          </div>
          
          <div className="nav-divider" />
          
          <nav className="primary-nav">
            {navItems.map(item => (
              <div 
                key={item.id}
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {activePage === item.id && <div className="active-indicator" />}
              </div>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <nav className="secondary-nav">
            {secondaryNav.map(item => (
              <span 
                key={item.id}
                className={`nav-link-sm ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </span>
            ))}
          </nav>

          <div className="auth-zone">
            {user ? (
              <div className="user-profile-trigger">
                <div className="avatar-mini" onClick={() => onNavigate('cabinet')}>
                  {user.name[0]}
                </div>
                <div className="user-info-drop" onClick={() => onNavigate('cabinet')}>
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
                <button className="logout-btn" onClick={logout}>
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button className="btn-login-premium" onClick={() => onNavigate('auth')}>
                Начать обучение
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
