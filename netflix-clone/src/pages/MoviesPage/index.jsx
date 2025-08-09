import React, { useEffect, useState } from 'react'
import './MoviesPage.css';
import { Link } from 'react-router-dom';


const MoviesPage = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmFjNjA0OTI5ZTEwZTNjYTA3OWI1MTVlNzlmMGRkMyIsIm5iZiI6MTc0NjIwMTk2MC45OTksInN1YiI6IjY4MTRlZDY4NDY3MDZmMmFhZjA4OThlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AIZieflJ1IjKZtoIMdtxFFZuAo1XaeM60sI1BR89TdA'
      }
    };
  
    useEffect(() => {
      const endpoint = `https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`;
  
      fetch(endpoint, options)
        .then(res => res.json())
        .then(res => {
          if (res && res.results) {
            setApiData(res.results);
          } else {
            console.error("No results found", res);
            setApiData([]);
          }
        })
        .catch(err => console.error(err));
    }, [category]);
  
  return (
    <div className='moviesPage'>
      <div className="inner">
        <div className="movie-headings">
        <div className="main-heading">
          <h1>Movies</h1>
        </div>
        <div className="paragraph">
          <p>Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</p>
        </div>
        </div>
        <div className="cards-list">
        {apiData.map((card, index) => (
        <Link to={`/player/${card.id}`} onClick={() => window.scroll(0, 0)} key={index}>
        <div className="cards">
           <div className="cards-info">
           <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path || card.poster_path}`} alt={card.title || 'Untitled'}/>
        <p>{card.title}</p>
      </div>
    </div>
  </Link>
))}
  </div>
      </div>
    </div>
  )
}

export default MoviesPage
