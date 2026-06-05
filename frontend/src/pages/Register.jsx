import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'
import { useAuth } from '../context/useAuth'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { login: saveAuth } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await register({ username, email, password })
      saveAuth(res.data.user, res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '360px', margin: '80px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>Create account</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '24px' }}>
        Join Pinnacle today
      </p>

      {error && (
        <p style={{ color: '#e60023', textAlign: 'center', marginBottom: '16px' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#888' }}>
        Already have an account? <Link to="/login" style={{ color: '#e60023' }}>Log in</Link>
      </p>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: '14px', marginBottom: '6px', color: '#555' }
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '14px', fontSize: '14px', boxSizing: 'border-box' }
const buttonStyle = { width: '100%', padding: '12px', background: '#e60023', color: '#fff', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }

export default Register