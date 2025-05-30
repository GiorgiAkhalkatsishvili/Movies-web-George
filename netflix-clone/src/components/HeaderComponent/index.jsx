import React, { useEffect, useRef, useState } from 'react'
import './HeaderComponent.css'
import netflixText from '../../assets/netflix-text.png';
import { Link } from 'react-router-dom';
import { login } from '../../firebase';
import loggedInUser from '../../assets/user.png'
import { clearAddedMovies } from '../../Redux/moviesSlice';
import { logout } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

const HeaderComponent = () => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarMenuRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const [notificationDrop, setNotificationDrop] = useState(false);
  const addedMovies = useSelector((state) => state.movie.addedMovies);
  const notificationRef = useRef();
  const dropDownRef = useRef();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const openMenu = () => {
    setSidebar(true);
  };

  const closeMenu = () => {
    setSidebar(false);
  };

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const toggleNotificationDrop = () => {
    setNotificationDrop(!notificationDrop);
  }

  useEffect(() => {
    const handleClickOutsideSidebar = (event) => {
      if (sidebarMenuRef.current && !sidebarMenuRef.current.contains(event.target)) {
        setSidebar(false);
      }
    };

    if (sidebar) {
      document.addEventListener('mousedown', handleClickOutsideSidebar);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideSidebar);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSidebar);
    };
  }, [sidebar]);


  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target) && 
          !event.target.closest('.loggedIn-user-icon')) {
        setDropDown(false);
      }
    };

    if (dropDown) {
      document.addEventListener('mousedown', handleClickOutsideDropdown);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, [dropDown]);


  useEffect(() => {
    const handleClickOutsideNotification = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target) && 
          !event.target.closest('.notification')) {
        setNotificationDrop(false);
      }
    };

    if (notificationDrop) {
      document.addEventListener('mousedown', handleClickOutsideNotification);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideNotification);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideNotification);
    };
  }, [notificationDrop]);

  const UserIcon = ({ onClick }) => (
    <div onClick={onClick} className="iconOne user">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" fill='#fff'/>
      </svg>
    </div>
  );

  const LoggedInUserIcon = ({ onClick }) => (
    <div onClick={onClick} className="loggedIn-user-icon">
      <img src={loggedInUser} alt="Logged in user" />
    </div>
  );

  return (
    <div className='headerComponent'>
      <div className="header-inner">
        <div className="main-header-elements">
          <div className="main-netflix-heading">
            <Link to='/'>
              <img src={netflixText} alt="" />
              <p>CLONE</p>
            </Link>
          </div>
          <div className="nav-links-list">
            <ul>
              <Link to='/'><li>Home</li></Link>
              <li>TV Shows</li>
              <li>Movies</li>
              <li>New & Popular</li>
              <Link to='/list'><li>My List</li></Link>
              <li>Audio & Subtitles</li>
            </ul>
          </div>
          <div className="header-icons-list">
            <div className="iconOne search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#fff'/>
              </svg>
            </div>
            <div onClick={toggleNotificationDrop} className="iconOne notification">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" fill='#fff'/>
              </svg>
            </div>
            {addedMovies.length !== 0 ? <div className="notification-circle"></div> 
            : ''  
           }
            {user ? (
              <LoggedInUserIcon onClick={toggleDropDown} />
            ) : (
              <Link to='/login'>
                <UserIcon />
              </Link>
            )}
          </div>
          <div onClick={openMenu} className="burger-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" fill='#e5e5e5'/>
            </svg>
          </div>
          <div
            className="sidebar-menu"
            ref={sidebarMenuRef}
            style={{
              transform: sidebar ? 'translateX(0rem)' : 'translateX(50rem)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <div className="sidebar-list">
              <div className="closing-svg">
                <svg onClick={closeMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" fill='#e5e5e5'/>
                </svg>
              </div>
            </div>
            <div className="sidebar-menu-list">
              <ul>
                <Link to='/'><li onClick={closeMenu}>Home</li></Link>
                <li onClick={closeMenu}>TV Shows</li>
                <li onClick={closeMenu}>Movies</li>
                <li onClick={closeMenu}>New & Popular</li>
                <Link to='/list'><li onClick={closeMenu}>My List</li></Link>
                <li onClick={closeMenu}>Audio & Subtitles</li>
              </ul>
              <div className="sidebar-menu-icons">
                <div onClick={closeMenu} className="iconOne search">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#e5e5e5'/>
                  </svg>
                </div>
                <div
                  onClick={() => {
                    closeMenu();
                    toggleNotificationDrop();
                  }}
                  className="iconOne notification">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" fill='#e5e5e5'/>
                  </svg>
                  {addedMovies.length !== 0 ? <div className="notification-circle"></div> 
            : ''  
                  }
                </div>
                {user ? (
                    <div onClick={(e) => {
                      closeMenu();
                      toggleDropDown();
                    }} className="loggedIn-user-icon">
                      <img src={loggedInUser} alt="Logged in user" />
                    </div>
                ) : (
                  <Link to='/login'>
                    <div onClick={closeMenu} className="iconOne user">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" fill='#e5e5e5'/>
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="loggedIn-dropDown" 
            ref={dropDownRef}
            style={{ display: dropDown ? 'block' : 'none' }}>
            <div className="drop-down-texts">
             <Link onClick={()=>setDropDown(false)} to='/profile'><p>Profile</p></Link>
             <Link onClick={()=>setDropDown(false)} to='/list'><p>My List</p></Link>
              <p onClick={() => {
              logout();
              setDropDown(false);
              dispatch(clearAddedMovies());  
            }}>Log Out of Netflix</p>
             </div>
          </div>
          <div className="notification-dropDown"
  ref={notificationRef}
  style={{ display: notificationDrop ? 'block' : 'none' }}>
  {addedMovies.length === 0 ? (
    <div className="drop-down-texts">
      <p className='notification-text'>No new notifications</p>
    </div>
  ) : (
    <div className="notification-content">
      <div className="main-titles">
      <h4>Recently Added:</h4>
      <Link onClick={()=>setNotificationDrop(false)} to='/list'><h4 id='list-link'>See All</h4></Link>
      </div>
      {addedMovies.map((movie, index) => (
        <div key={index} className="notification-movie-item">
          <div className="notification-movie-img">
            <img 
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path || movie.backdrop_path}`} 
              alt='movie image could not load' 
            />
          </div>
          <div className="notification-movie-info">
            <p className="notification-movie-title">{movie.title + ' has been added to the list'}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent;
