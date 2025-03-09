import React from 'react'
import { useNavigate } from 'react-router-dom'

const SpiritButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/spiriter')
  }

  return (
    <div>
      <button
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200"
        onClick={handleClick}
      >
        Spiriter
      </button>
    </div>
  )
}

export default SpiritButton
