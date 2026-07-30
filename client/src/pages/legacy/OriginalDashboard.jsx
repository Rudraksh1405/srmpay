import { useEffect, useState } from 'react'
import './App.css'

const fallbackDashboard = {
  student: { name: 'Student', id: 'SRM0000000', programme: 'SRM KTR Campus' },
  balance: 24500,
  dueDate: '15 Aug 2026',
  payments: [
    { id: 'tuition', title: 'Tuition fee', description: 'Semester 2026–27', amount: 18000, status: 'Due' },
    { id: 'hostel', title: 'Hostel fee', description: 'August 2026', amount: 6500, status: 'Due' },
  ],
}

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

function OriginalDashboard() {
  const [dashboard, setDashboard] = useState(fallbackDashboard)
  const [selectedPayment, setSelectedPayment] = useState('tuition')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    fetch('/api/v1/dashboard')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(setDashboard)
      .catch(() => setNotice('Showing sample payment information while the server is unavailable.'))
  }, [])

  const selected = dashboard.payments.find((payment) => payment.id === selectedPayment) ?? dashboard.payments[0]

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="SRMPAY home"><span>SRM</span>PAY</a>
        <div className="student-chip"><span className="avatar">{dashboard.student.name.charAt(0)}</span><span>{dashboard.student.name}</span></div>
      </header>

      <section className="welcome" id="home">
        <div>
          <p className="eyebrow">Student payment portal</p>
          <h1>Good day, {dashboard.student.name}.</h1>
          <p className="muted">{dashboard.student.id} · {dashboard.student.programme}</p>
        </div>
        <div className="secure-note">◉ Secure payments</div>
      </section>

      {notice && <p className="notice" role="status">{notice}</p>}

      <section className="dashboard-grid" aria-label="Payment overview">
        <div className="card balance-card">
          <p className="eyebrow">Total outstanding</p>
          <strong>{formatCurrency(dashboard.balance)}</strong>
          <p>Due by <b>{dashboard.dueDate}</b></p>
          <div className="progress"><span /></div>
        </div>

        <div className="card payment-card">
          <div className="card-heading"><div><p className="eyebrow">Make a payment</p><h2>Select a fee</h2></div><span className="badge">2 pending</span></div>
          <div className="payment-options">
            {dashboard.payments.map((payment) => (
              <button key={payment.id} className={selected.id === payment.id ? 'payment-option selected' : 'payment-option'} onClick={() => setSelectedPayment(payment.id)}>
                <span><b>{payment.title}</b><small>{payment.description}</small></span>
                <span className="amount">{formatCurrency(payment.amount)}</span>
              </button>
            ))}
          </div>
          <button className="primary-button" onClick={() => setNotice(`Payment checkout for ${selected.title} will be connected next.`)}>Pay {formatCurrency(selected.amount)} <span>→</span></button>
        </div>
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        <button onClick={() => setNotice('Receipts will appear here once payments are recorded.')}>▣<span>Payment receipts</span></button>
        <button onClick={() => setNotice('Support requests will be available here.')}>?<span>Need help?</span></button>
        <button onClick={() => setNotice('Profile settings will be available here.')}>⚙<span>Account settings</span></button>
      </section>
    </main>
  )
}

export default OriginalDashboard
