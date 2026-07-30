import { Moon, ShoppingBag, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useTheme } from '../contexts/ThemeContext'

export default function StudentHeader() {
  const { theme, toggle } = useTheme()
  const { items } = useCart()
  return <header className="top-nav"><Link to="/" className="brand">SRM<b>PAY</b> FOOD</Link><div className="nav-actions"><button className="icon-button" onClick={toggle} aria-label="Toggle theme">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><Link className="nav-link" to="/cart"><ShoppingBag size={18} />{items.length > 0 && <span className="cart-count">{items.length}</span>}</Link></div></header>
}
