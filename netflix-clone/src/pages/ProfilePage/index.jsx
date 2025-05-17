import React from 'react'
import './ProfilePage.css';
import loggedInUser from '../../assets/user.png'

const ProfilePage = () => {
  return (
    <div className='profilePage'>
      <div className="inner">
        <div className="main-heading">
          <h1>Edit Profile</h1>
          <hr />
        </div>
        <div className="main-user-content">
          <div className="user-img">
            <img src={loggedInUser} alt="" />
          </div>
          <div className="user-info">
            <div className="user-inner">
              <div className="user-inputs">
              <div className="inputOne">
              <input type="text" placeholder='Change name'/>
            </div>
            <div className="inputTwo">
              <input type="checkbox" />
              <p>Kid?</p>
            </div>
            </div>
              <div className="language-option">
                <p>Language</p>
<select name="language" id="language">
  <option value="English">English</option>
</select>
            </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="profile-btns">
          <div className="btnOne">
            <button>SAVE</button>
          </div>
          <div className="btnOne">
            <button>CANCEL</button>
          </div>
          <div className="btnOne">
            <button>DELETE PROFILE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
