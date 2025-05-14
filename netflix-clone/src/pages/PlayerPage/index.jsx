import React, { useEffect, useState } from 'react'
import './PlayerPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAddedMovies } from '../../Redux/moviesSlice';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PlayerPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [apiData, setApiData] = useState({
    title: "",
    key: "",
    published_at: "",
    typeof: ""
  });

  // Authentication state tracking
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Store user in state and localStorage for persistence
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || currentUser.email.split('@')[0]
        }));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    // Also check localStorage in case auth state hasn't updated yet
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && !user) {
      setUser(storedUser);
    }

    return () => unsubscribe();
  }, []);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmFjNjA0OTI5ZTEwZTNjYTA3OWI1MTVlNzlmMGRkMyIsIm5iZiI6MTc0NjIwMTk2MC45OTksInN1YiI6IjY4MTRlZDY4NDY3MDZmMmFhZjA4OThlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AIZieflJ1IjKZtoIMdtxFFZuAo1XaeM60sI1BR89TdA'
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Get movie video
        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
        const videoData = await videoRes.json();
        const trailer = videoData.results[0];

        // Get full movie details
        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const movieData = await movieRes.json();

        setApiData({
          id: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          poster_path: movieData.poster_path,
          release_date: movieData.release_date,
          trailerKey: trailer?.key || '',
          trailerName: trailer?.name || '',
          trailerType: trailer?.type || '',
          published_at: trailer?.published_at || '',
        });
      } catch (error) {
        console.error("Error fetching movie data:", error);
        toast.error("Failed to load movie data");
      }
    };

    fetchMovieData();
  }, [id]);

  const addMovieToList = () => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        toast.error("You need to log in first");
        return;
      } else {
        setUser(storedUser);
      }
    }

    try {
      const movieToAdd = {
        id: apiData.id,
        title: apiData.title,
        overview: apiData.overview,
        poster_path: apiData.poster_path,
        release_date: apiData.release_date,
        userId: user.uid
      };
      
      dispatch(setAddedMovies(movieToAdd));
      toast.success('Movie added to list');
    } catch (error) {
      console.error("Error adding movie:", error);
      toast.error('Failed to add movie to list');
    }
  };
  
  return (
    <div className='playerPage'>
      <div className="inner">
        <div className="arrow-svg">
          <div className="icon">
            <svg onClick={()=>{navigate('/')}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill='#fff'/></svg>
          </div>
          <iframe src={`https://www.youtube.com/embed/${apiData.trailerKey}`} width='90%' height='90%' title='trailer' frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className="player-info">
          <div className="player-texts">
            <p>{apiData.release_date ? apiData.release_date.slice(0,10) : ''}</p>
            <p>{apiData.title}</p>
            <p>{apiData.trailerType}</p>
          </div>
          <div className="player-btn">
          <button onClick={addMovieToList}>Add to list</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage
