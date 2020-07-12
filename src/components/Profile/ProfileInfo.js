import React, { useState, useEffect } from 'react';

// import {ProfileService} from 'services'
import * as ProfileService from '../../services/ProfileService';

import './ProfileInfo.css';

const ProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState({});

  const renderProfile = (profileInfo) => {
    const { name, login, bio, company, location, avatar_url } = profileInfo;
    return (
      <div className="about">
        <img src={avatar_url} alt="Avatar" className="avatar item" />
        <span className="item">{name}</span>
        <span className="item">{login}</span>
        <span className="item">{bio}</span>
        <button
          type="button"
          name=""
          onClick={() => {}}
          className="editProfileBtn"
        >
          Edit Profile
        </button>
        <span className="item">{company}</span>
        <span className="item">{location}</span>
      </div>
    );
  };

  useEffect(() => {
    const getProfileInfo = async () => {
      const { response, error } = await ProfileService.getProfileInfo();
      if (!error) {
        setProfileInfo(response);
      } else {
        //show error
        alert('Error fetching user profile');
      }
    };
    getProfileInfo();
  }, []);

  return <div className="main">{renderProfile(profileInfo)}</div>;
};

export default ProfileInfo;
