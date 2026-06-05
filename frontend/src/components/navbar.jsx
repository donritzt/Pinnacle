import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ fontWeight: '700', fontSize: '22px', color: '#e60023' }}>
        Pinnacle
      </Link>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/create" style={{
              background: '#e60023',
              color: 'white',
              padding: '8px 18px',
              borderRadius: '20px',
              fontWeight: '500',
              fontSize: '14px',
            }}>
              + New pin
            </Link>
            <Link to="/profile" style={{
              fontWeight: '500',
              fontSize: '14px',
              color: '#333',
              padding: '8px 12px',
              borderRadius: '20px',
              background: '#f0f0f0',
            }}>
              {user.username}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              padding: '8px 16px',
              borderRadius: '20px',
              background: '#f0f0f0',
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              background: '#e60023',
            }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar