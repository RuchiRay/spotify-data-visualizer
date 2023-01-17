import React from 'react'

const Alert = ({message}) => {
  return (
    <div className="absolute top-8 lg:-top-8 left-2/4 -translate-x-2/4 py-3 rounded-md bg-blue-400 w-72 text-lg text-center text-white">{message?message:'Playlist added to your library'}</div>
  )
}

export default Alert