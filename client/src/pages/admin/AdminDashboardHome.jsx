import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import { useEffect, useState } from 'react'
import { mockApi } from '../../mockData'
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip)
export default function AdminDashboardHome() { const [revenue, setRevenue] = useState(); useEffect(() => { mockApi.getRevenue().then(setRevenue) }, []); return <><section className="metrics"><div className="glass-card metric"><p>ACTIVE MERCHANTS</p><strong>3</strong></div><div className="glass-card metric"><p>ORDERS TODAY</p><strong>{revenue?.orders || 0}</strong></div><div className="glass-card metric"><p>PENDING REQUESTS</p><strong>2</strong></div></section><section className="glass-card content-card"><p className="eyebrow">Platform revenue</p><Line data={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ data: revenue?.series || [], borderColor: '#f97316', backgroundColor: 'transparent', tension: .35 }] }} options={{ plugins: { legend: { display: false } } }} /></section></> }
