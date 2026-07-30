import { ArrowLeft, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StudentHeader from '../../components/StudentHeader'
import { useCart } from '../../contexts/CartContext'
import { mockApi } from '../../mockData'

export default function VendorMenu() { const { id } = useParams(); const [vendor, setVendor] = useState(); const [items, setItems] = useState([]); const { add } = useCart(); useEffect(() => { mockApi.getVendor(id).then(setVendor); mockApi.getMenu(id).then(setItems) }, [id]); return <div className="student-shell"><StudentHeader /><section className="hero"><div><Link to="/" className="page-subtitle"><ArrowLeft size={16} /> All vendors</Link><p className="eyebrow">{vendor?.location}</p><h1 className="page-title">{vendor?.name || 'Loading menu...'}</h1></div></section><section className="menu-grid">{items.map((item) => <article className="glass-card menu-card" key={item._id}><img className="card-image" src={item.imageUrl} alt="" /><div className="card-body"><h2 className="card-title">{item.name}</h2><p className="page-subtitle">{item.isAvailable ? 'Freshly prepared' : 'Currently unavailable'}</p></div><div className="menu-footer"><span className="price">₹{item.price}</span><button className="primary-btn" disabled={!item.isAvailable} onClick={() => add(item)}><Plus size={16} /> Add</button></div></article>)}</section></div> }
