import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useAuth } from '../contexts/AuthContext';

const metrics = [
  { label: 'Pedidos hoje', value: '28', change: '+18,4%', icon: 'receipt' as const, tone: 'orange' },
  { label: 'Receita do dia', value: 'R$ 1.284', change: '+12,8%', icon: 'trend' as const, tone: 'green' },
  { label: 'Ticket médio', value: 'R$ 45,85', change: '+4,2%', icon: 'star' as const, tone: 'purple' },
];

const activity = [
  { name: 'Pedido #1048', detail: '2 itens · Mesa do bairro', amount: 'R$ 48,00', status: 'Em preparo', tone: 'preparing' },
  { name: 'Pedido #1047', detail: '3 itens · Entrega', amount: 'R$ 72,50', status: 'Pronto', tone: 'ready' },
  { name: 'Pedido #1046', detail: '1 item · Retirada', amount: 'R$ 29,90', status: 'Entregue', tone: 'delivered' },
];

export default function Overview() {
  const { logout } = useAuth();
  const displayName = 'Jhonatan Gomes';

  return (
    <div className="app-layout">
      <Header userName={displayName} onLogout={logout} />
      <main className="app-main">
        <div className="topbar"><div><span className="date-label">TERÇA-FEIRA, 03 DE NOVEMBRO</span><h1>Bom dia, Jhonatan <span aria-hidden="true">✦</span></h1></div><div className="online-pill"><span /> Aberto agora</div></div>

        <section className="hero-banner" aria-labelledby="overview-title">
          <div><span className="eyebrow light">Fjord &amp; Fogo · Resumo do dia</span><h2 id="overview-title">Tudo sob controle,<br /><em>do seu jeito.</em></h2><p>Acompanhe o ritmo da cozinha e deixe seu cardápio sempre em dia.</p></div>
          <Link className="button button-light" to="/cardapio">Gerenciar cardápio <Icon name="arrow" /></Link>
        </section>

        <section className="metric-grid" aria-label="Indicadores do dia">
          {metrics.map((metric) => <article className="metric-card" key={metric.label}><div className={`metric-icon ${metric.tone}`}><Icon name={metric.icon} /></div><div><span>{metric.label}</span><strong>{metric.value}</strong><small><b>↗ {metric.change}</b> vs. ontem</small></div></article>)}
        </section>

        <div className="overview-grid">
          <section className="panel activity-panel" aria-labelledby="activity-title"><div className="panel-heading"><div><span className="section-kicker">Acompanhe de perto</span><h2 id="activity-title">Pedidos recentes</h2></div><Link to="/cardapio" className="text-link">Ver cardápio <Icon name="arrow" /></Link></div><div className="activity-list">{activity.map((item) => <div className="activity-row" key={item.name}><span className="order-avatar">{item.name.slice(-2)}</span><div className="activity-copy"><strong>{item.name}</strong><span>{item.detail}</span></div><strong className="activity-amount">{item.amount}</strong><span className={`status-badge ${item.tone}`}>{item.status}</span><button className="icon-button small" aria-label={`Mais opções para ${item.name}`} type="button"><Icon name="more" /></button></div>)}</div></section>
          <section className="panel rating-panel" aria-labelledby="rating-title"><div className="panel-heading"><div><span className="section-kicker">A percepção dos clientes</span><h2 id="rating-title">Sua avaliação</h2></div><Icon name="star" className="heading-star" /></div><div className="rating-score"><strong>4,8</strong><div><div className="stars" aria-label="4,8 de 5 estrelas">★★★★★</div><span>de 5,0 · 186 avaliações</span></div></div><div className="rating-bar"><span style={{ width: '92%' }} /></div><p className="rating-note"><Icon name="trend" /> <b>Excelente!</b> Você está entre os restaurantes mais bem avaliados.</p></section>
        </div>
      </main>
    </div>
  );
}
