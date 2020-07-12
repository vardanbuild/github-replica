import React, {useState, useEffect} from 'react'

// import {ProfileService} from 'services'
import * as ProfileService from '../../services/ProfileService'

import './ProfileInfo.css';

const ProfileInfo = () => {

    const [profileInfo, setProfileInfo] = useState({})

    useEffect(() => {
        const getProfileInfo = async () => {
            const {response, error} = await ProfileService.getProfileInfo()
            if(!error){
                setProfileInfo(response)
            }else{
                //show error
            }
        }
        getProfileInfo()
    }, [])

    return(
        <div className="main">Profile</div>
    )
}

export default ProfileInfo