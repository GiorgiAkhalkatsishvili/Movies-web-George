import React, { useState } from 'react';
import './LoginPage.css';
import { login, signup } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleSignState = () => {
    setSignState(prev => prev === "Sign In" ? "Sign Up" : "Sign In");
    setErrorMessage('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const user_auth = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    // ✅ Input validation
    if (!email.trim() || !password.trim() || (signState === "Sign Up" && !name.trim())) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      if (signState === "Sign In") {
        await login(email, password);
        navigate('/');
      } else {
        await signup(name, email, password);
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Authentication failed');
    }
  };

  return (
    <div className='loginPage'>
      <div className="login-inner">
        <div className="main-login-container">
          <div className="login-heading">
            <h1>{signState}</h1>
          </div>
          <form onSubmit={user_auth}>
            <div className="login-inputs">
              {signState === "Sign Up" && (
                <div className="inpOne">
                  <input
                    type='text'
                    placeholder='Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="inpOne">
                <input
                  type="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inpOne">
                <input
                  type="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {errorMessage && (
              <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
                {errorMessage}
              </div>
            )}
            <div className="login-btn">
              <button type='submit'>{signState}</button>
            </div>
          </form>
          <div className="container">
            <div className="checkBox-inp">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <div className="login-switch">
              <p>
                <span
                  onClick={toggleSignState}
                  style={{ cursor: 'pointer', color: '#fff', fontSize: '17px' }}
                >
                  {signState === "Sign In" ? "Sign Up" : "Sign In"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
