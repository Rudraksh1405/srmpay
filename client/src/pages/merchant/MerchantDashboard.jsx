import { BarChart3, CircleDollarSign, ListOrdered, LogOut, Settings, UtensilsCrossed } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function MerchantDashboard() { const { logout } = useAuth(); const { toggle } = useTheme(); const links = [[ '', BarChart3, 'Dashboard' ], [ 'menu', UtensilsCrossed, 'Menu' ], [ 'tokens', ListOrdered, 'Tokens' ], [ 'payments', CircleDollarSign, 'Payment Details' ], [ 'settings', Settings, 'Settings' ]]; return <div className="layout"><aside className="sidebar"><p className="portal-name">SRMPAY MERCHANT</p>{links.map(([to, Icon, label]) => <NavLink end={to === ''} className="side-link" to={to} key={label}><Icon size={19} /><span>{label}</span></NavLink>)}<button className="side-logout" onClick={logout}><LogOut size={18} /> <span>Logout</span></button></aside><main className="portal-content"><div className="portal-topbar"><div><p className="eyebrow">Merchant portal</p><h1 className="page-title">Good morning</h1></div><button className="icon-button" onClick={toggle}>◐</button></div><Outlet /></main></div> }
