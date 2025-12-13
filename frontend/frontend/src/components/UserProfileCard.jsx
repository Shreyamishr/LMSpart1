import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserProfileCard({ user = {}, showEdit = true }){
  const navigate = useNavigate()
  const initial = (user.name && user.name[0]) || 'U'

  return (
    <div className="profile-card">
      <button
        className="back-button"
        aria-label="Go to Home"
        title="Home"
        onClick={() => navigate('/')}
      >&larr;</button>

      <div className="profile-header">
        {user.photourl ? (
          <div className="profile-avatar">
            <img src={user.photourl} alt={user.name || 'User'} className="profile-avatar__img" />
          </div>
        ) : (
          <div className="profile-avatar"><span>{initial}</span></div>
        )}
        <h2 className="user-name">{user.name || 'Unknown'}</h2>
        <p className="user-role">{(user.role || '').toString().toUpperCase()}</p>
      </div>

      <hr className="divider" />

      <div className="profile-details">
        <div className="detail-item"><label>Email</label><p>{user.email || '—'}</p></div>
        <div className="detail-item"><label>Bio</label><p>{user.description || user.bio || 'No bio available.'}</p></div>
        <div className="detail-item"><label>Enrolled Courses</label><p className="course-count">{Array.isArray(user.enrolledCourses) ? user.enrolledCourses.length : (user.enrolledCourses || 0)}</p></div>
      </div>

      {showEdit && (
        <button className="edit-profile-button" onClick={() => navigate('/editprofile')}>Edit Profile</button>
      )}
    </div>
  )
}
