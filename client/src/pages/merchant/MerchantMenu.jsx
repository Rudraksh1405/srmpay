import { useEffect, useState } from 'react'
import { mockApi } from '../../mockData'
export default function MerchantMenu() { const [items, setItems] = useState([]); useEffect(() => { mockApi.getMerchantMenu().then(setItems) }, []); return <section className="glass-card content-card"><p className="eyebrow">Menu management</p><h2 className="card-title">Your menu</h2>{items.map((item) => <div className="row" key={item._id}><span><b>{item.name}</b><br /><small>₹{item.price}</small></span><span className="tag">{item.isAvailable ? 'Available' : 'Unavailable'}</span></div>)}</section> }
