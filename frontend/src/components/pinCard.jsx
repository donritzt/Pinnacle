import { useNavigate } from 'react-router-dom'

function PinCard({ pin }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/pins/' + pin.id)}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        breakInside: 'avoid',
        marginBottom: '16px',
        cursor: 'pointer',
      }}
    >
      <img
        src={pin.image_url}
        alt={pin.title}
        style={{ width: '100%', display: 'block' }}
      />
      <div style={{ padding: '12px' }}>
        <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>{pin.title}</p>
        {pin.description && (
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#555' }}>
            {pin.description}
          </p>
        )}
        <small style={{ color: '#888' }}>door {pin.username}</small>
      </div>
    </div>
  )
}

export default PinCard