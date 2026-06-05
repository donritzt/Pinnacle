import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPin, deletePin } from '../api/pins'
import { useAuth } from '../context/useAuth'

function PinDetail() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [pin, setPin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPin() {
      try {
        const res = await getPin(id)
        setPin(res.data)
      } catch (err) {
        setError('Pin not found')
      } finally {
        setLoading(false)
      }
    }
    fetchPin()
  }, [id])

  async function handleDelete() {
    if (!window.confirm('Delete this pin?')) return
    try {
      await deletePin(id, token)
      navigate('/')
    } catch (err) {
      alert('Could not delete pin')
    }
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center', marginTop: '40px', color: '#e60023' }}>{error}</p>

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', display: 'flex', gap: '40px' }}>
      <div style={{ flex: 1 }}>
        <img
          src={pin.image_url}
          alt={pin.title}
          style={{ width: '100%', borderRadius: '16px', display: 'block' }}
        />
      </div>

      <div style={{ width: '300px', flexShrink: 0 }}>
        <h1 style={{ marginTop: 0 }}>{pin.title}</h1>

        {pin.description && (
          <p style={{ color: '#555', lineHeight: '1.6' }}>{pin.description}</p>
        )}

        <p style={{ color: '#888', fontSize: '14px' }}>by {pin.username}</p>

        {user && user.id === pin.user_id && (
          <button
            onClick={handleDelete}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              background: '#e60023',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Delete pin
          </button>
        )}
      </div>
    </div>
  )
}

export default PinDetail