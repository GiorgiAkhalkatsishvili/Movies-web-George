import React, { useState, useRef, useEffect } from 'react';
import './ProfilePage.css';
import defaultUserImage from '../../assets/user.png';
import { auth, storage } from '../../firebase';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(defaultUserImage);
  const [rawImageFile, setRawImageFile] = useState(null); // for uploading
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [isKid, setIsKid] = useState(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || '');
        setProfileImage(user.photoURL || defaultUserImage);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // for preview
      };
      reader.readAsDataURL(file);
      setRawImageFile(file); // store the actual file for Firebase Storage
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      let photoURL = user.photoURL;

      if (rawImageFile) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, rawImageFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Profile updated successfully")
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.')
    }
  };

  const navigateToHome = () => {
    navigate('/');
    window.scroll(0,0)
  }

  return (
    <div className='profilePage'>
      <div className="inner">
        <div className="main-heading">
          <h1>Edit Profile</h1>
          <hr />
        </div>
        <div className="main-user-content">
          <div className="user-img" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
            <img src={profileImage} alt="Profile" />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="user-info">
            <div className="user-inner">
              <div className="user-inputs">
                <div className="inputOne">
                  <input
                    type="text"
                    placeholder="Change name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inputTwo">
                  <input
                    type="checkbox"
                    checked={isKid}
                    onChange={(e) => setIsKid(e.target.checked)}
                  />
                  <p>Kid?</p>
                </div>
              </div>
              <div className="language-option">
                <p>Language</p>
                <select
                  name="language"
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="profile-btns">
          <div className="btnOne">
            <button onClick={handleSave}>SAVE</button>
          </div>
          <div className="btnOne">
            <button onClick={navigateToHome}>CANCEL</button>
          </div>
          <div className="btnOne">
            <button>DELETE PROFILE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
