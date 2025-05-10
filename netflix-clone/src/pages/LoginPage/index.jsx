import React, { useState } from 'react';
import './LoginPage.css';
import { login, signup } from '../../firebase';

const LoginPage = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSignState = () => {
    setSignState(prev => prev === "Sign In" ? "Sign Up" : "Sign In");
    setErrorMessage(''); // Clear error when toggling modes
  };

  const user_auth = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage('');
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='loginPage'>
      <div className="login-inner">
        <div className="main-login-container">
          <div className="login-heading">
            <h1>{signState}</h1>
          </div>

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
                placeholder='Email or Phone Number'
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
            <button onClick={user_auth} type='submit'>{signState}</button>
          </div>
          <div className="container">
            <div className="checkBox-inp">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <div className="login-switch">
              <p>
                {signState === "Sign In" ? '' : ''}
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
