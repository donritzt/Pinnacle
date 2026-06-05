import { useState, useEffect } from 'react'
import { getPins } from '../api/pins'
import PinCard from '../components/PinCard'

function Home() {
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPins() {
      try {
        const res = await getPins()
        setPins(res.data)
      } catch (err) {
        setError('Could not load pins')
      } finally {
        setLoading(false)
      }
    }

    fetchPins()
  }, [])

  if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center', marginTop: '40px', color: '#e60023' }}>{error}</p>

  if (pins.length === 0) return (
    <p style={{ textAlign: 'center', marginTop: '40px', color: '#888' }}>
      No pins yet. Be the first to add one!
    </p>
  )

  return (
    <div style={{
      columns: '250px',
      columnGap: '16px',
      padding: '24px',
    }}>
      {pins.map(pin => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  )
}

export default Home