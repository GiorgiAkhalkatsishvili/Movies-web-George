import React, { useEffect, useState } from 'react'
import './PlayerPage.css'
import { useNavigate, useParams } from 'react-router-dom';

const PlayerPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  });

 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmFjNjA0OTI5ZTEwZTNjYTA3OWI1MTVlNzlmMGRkMyIsIm5iZiI6MTc0NjIwMTk2MC45OTksInN1YiI6IjY4MTRlZDY4NDY3MDZmMmFhZjA4OThlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AIZieflJ1IjKZtoIMdtxFFZuAo1XaeM60sI1BR89TdA'
  }
};

  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
},[])
  
  return (
    <div className='playerPage'>
      <div className="inner">
        <div className="arrow-svg">
        <div className="icon">
          <svg onClick={()=>{navigate('/')}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill='#fff'/></svg>
        </div>
        <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width='90%' height='90%' title='trailer' frameborder="0" allowFullScreen></iframe>
      </div>
      <div className="player-info">
          <div className="player-texts">
          <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
          <div className="player-btn">
          <button>Add to list</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage
