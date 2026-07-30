import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import { useEffect, useState } from 'react'
import { mockApi } from '../../mockData'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)
export default function MerchantDashboardHome() { const [data, setData] = useState(); useEffect(() => { mockApi.getRevenue().then(setData) }, []); if (!data) return <p>Loading dashboard...</p>; return <><section className="metrics"><div className="glass-card metric"><p>TODAY'S REVENUE</p><strong>₹{data.today}</strong></div><div className="glass-card metric"><p>ORDERS TODAY</p><strong>{data.orders}</strong></div><div className="glass-card metric"><p>ACTIVE TOKEN</p><strong>#16</strong></div></section><section className="glass-card content-card"><p className="eyebrow">Weekly revenue</p><Bar data={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ data: data.series, backgroundColor: '#10b981', borderRadius: 8 }] }} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} /></section></> }
