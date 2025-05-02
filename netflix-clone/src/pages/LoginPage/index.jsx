import React from 'react'
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className='loginPage'>
      <div className="login-inner">
        <div className="main-login-container">
          <div className="login-heading">
            <h1>Sign In</h1>
          </div>
          <div className="login-inputs">
            <div className="inpOne">
              <input type="email" placeholder='Email or Phone Number'/>
            </div>
            <div className="inpOne">
              <input type="password" placeholder='Password'/>
            </div>
          </div>
          <div className="login-btn">
            <button>Sign In</button>
          </div>
          <div className="checkBox-inp">
            <input type="checkbox" />
            <p>Need help?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
