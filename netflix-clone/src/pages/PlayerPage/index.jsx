import React from 'react'
import './PlayerPage.css'

const PlayerPage = () => {
  return (
    <div className='playerPage'>
      <div className="inner">
        <div className="arrow-svg">
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill='#fff'/></svg>
        </div>
        <iframe src="https://www.youtube.com/embed/mJKGhAE-1CM" width='90%' height='90%' title='trailer' frameborder="0" allowFullScreen></iframe>
      </div>
      <div className="player-info">
        <p>Published Date</p>
        <p>Name</p>
        <p>Type</p>
      </div>
      </div>
    </div>
  )
}

export default PlayerPage
