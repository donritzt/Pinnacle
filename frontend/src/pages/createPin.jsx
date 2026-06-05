import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPin } from '../api/pins'
import { useAuth } from '../context/useAuth'

function CreatePin() {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { token } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await createPin({ title, image_url: imageUrl, description }, token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '480px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '24px' }}>Create a pin</h1>

      {error && (
        <p style={{ color: '#e60023', marginBottom: '16px' }}>{error}</p>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="preview"
          style={{ width: '100%', borderRadius: '16px', marginBottom: '20px', display: 'block' }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="https://..."
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Description (optional)</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Saving...' : 'Create pin'}
        </button>
      </form>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: '14px', marginBottom: '6px', color: '#555' }
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '14px', fontSize: '14px', boxSizing: 'border-box' }
const buttonStyle = { width: '100%', padding: '12px', background: '#e60023', color: '#fff', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }

export default CreatePin