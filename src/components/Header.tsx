import { NavLink } from 'react-router-dom';
import Icon from './Icon';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const navigation = [
  { to: '/', label: 'Visão geral', icon: 'grid' as const, end: true },
  { to: '/cardapio', label: 'Cardápio', icon: 'menu' as const },
];

export default function Header({ userName, onLogout }: HeaderProps) {
  const initials = userName.split(' ').map((name) => name[0]).join('').slice(0, 2).toUpperCase();

  return (
    <aside className="app-sidebar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">CB</div>
        <div><strong>Fjord &amp; Fogo</strong><span>Painel do restaurante</span></div>
      </div>

      <nav className="main-nav" aria-label="Navegação principal">
        <p className="nav-label">Workspace</p>
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-tip">
          <span className="tip-icon"><Icon name="trend" /></span>
          <div><strong>Seu cardápio</strong><p>Mantenha tudo atualizado.</p></div>
        </div>
        <div className="user-profile">
          <span className="avatar">{initials}</span>
          <div className="user-copy"><strong>{userName}</strong><span>Administrador</span></div>
          <button className="icon-button sidebar-logout" type="button" onClick={onLogout} aria-label="Sair da conta" title="Sair"><Icon name="logout" /></button>
        </div>
      </div>
    </aside>
  );
}
