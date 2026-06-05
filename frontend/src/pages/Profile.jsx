import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getPins } from '../api/pins'
import PinCard from '../components/PinCard'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    async function fetchPins() {
      try {
        const res = await getPins()
        const myPins = res.data.filter(pin => pin.user_id === user.id)
        setPins(myPins)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPins()
  }, [user])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
        paddingBottom: '24px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#EEEDFE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: '500',
          color: '#534AB7',
          flexShrink: 0,
        }}>
          {user.username[0].toUpperCase()}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ margin: '0 0 4px' }}>{user.username}</h1>
          <p style={{ margin: '0', color: '#888', fontSize: '14px' }}>{user.email}</p>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '14px' }}>{pins.length} pins</p>
        </div>

        <button onClick={handleLogout} style={{
          padding: '10px 20px',
          background: 'transparent',
          border: '1px solid #ddd',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#555',
        }}>
          Logout
        </button>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Your pins</h2>

      {pins.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          <p>No pins yet.</p>
          <button
            onClick={() => navigate('/create')}
            style={{
              padding: '10px 24px',
              background: '#e60023',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Create your first pin
          </button>
        </div>
      ) : (
        <div style={{ columns: '250px', columnGap: '16px' }}>
          {pins.map(pin => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile