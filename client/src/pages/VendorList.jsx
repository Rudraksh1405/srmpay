import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentHeader from '../components/StudentHeader'
import { mockApi } from '../mockData'

export default function VendorList() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { let active = true; fetch('/api/v1/vendors').then((response) => response.ok ? response.json() : Promise.reject()).then((data) => data.length ? data : mockApi.getVendors()).catch(() => mockApi.getVendors()).then((data) => active && setVendors(data)).finally(() => active && setLoading(false)); return () => { active = false } }, [])
  return <div className="student-shell"><StudentHeader /><section className="hero"><div><p className="eyebrow">Campus food, without the queue</p><h1 className="page-title">What are you<br />craving today?</h1><p className="page-subtitle">Order from your favourite campus vendors in a few taps.</p></div><span className="tag">● Vendors open now</span></section>{loading ? <p className="empty-state">Loading vendors...</p> : !vendors.length ? <p className="empty-state">No vendors available right now.</p> : <section className="vendor-grid">{vendors.map((vendor) => <Link key={vendor._id} to={`/vendor/${vendor._id}`} className="glass-card vendor-card"><img className="card-image" src={vendor.imageUrl || `https://placehold.co/700x400/f97316/ffffff?text=${encodeURIComponent(vendor.name)}`} alt="" /><div className="card-body"><h2 className="card-title">{vendor.name}</h2><div className="card-meta"><span>{vendor.category}</span><span><MapPin size={13} /> {vendor.location}</span></div></div></Link>)}</section>}</div>
}
