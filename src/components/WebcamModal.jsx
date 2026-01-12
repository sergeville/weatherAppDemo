import { useEffect } from 'react'

function WebcamModal({ webcamData, onClose }) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!webcamData) return null

  return (
    <div className="webcam-modal-overlay" onClick={onClose}>
      <div className="webcam-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="webcam-modal-header">
          <h3>📹 Live Webcam - {webcamData.name}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="webcam-container">
          <iframe
            src={webcamData.url}
            title={`Live webcam from ${webcamData.name}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="webcam-iframe"
          />
        </div>
        <div className="webcam-modal-footer">
          <p>Source: {webcamData.source}</p>
          <p className="webcam-note">
            🎥 This is a live feed - weather conditions may vary from current data
          </p>
        </div>
      </div>
    </div>
  )
}

export default WebcamModal
