import React from 'react';
import './UserProfile.css'; 
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserProfileCard from '../components/UserProfileCard'

const UserProfile = () => {
    const navigate = useNavigate()
    const { userData: storeUser, loading } = useSelector(state => state.user)

  
    if (loading || !storeUser) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                   
                    <p style={{textAlign: 'center', color: '#666'}}>Loading Profile Data...</p>
                </div>
            </div>
        )
    }

    const user = storeUser; 
    
  
    const handleGoBack = () => {
        navigate(-1); 
    };


    const profileInitial = (user.name && user.name[0]) || (user.email && user.email[0]) || 'U';


    return (
        <div className="profile-container">
            <UserProfileCard user={user} showEdit={true} />
        </div>
    );
};

export default UserProfile;