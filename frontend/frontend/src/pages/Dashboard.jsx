import React from 'react'
import { useSelector } from 'react-redux'
import Nav from '../Component/Nav'
import UserProfileCard from '../components/UserProfileCard'

export default function Dashboard(){
  const user = useSelector(s => s.user.userData)

  return (
    <div>
      <Nav userData={user} />
      <div style={{paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '360px 1fr', gap: '20px', alignItems: 'start'}}>
          <div>
            <h3 style={{marginBottom: '12px', fontWeight: 700}}>My Profile</h3>
            <UserProfileCard user={user} showEdit={true} />
          </div>

          <div>
            <h3 style={{marginBottom: '12px', fontWeight: 700}}>Dashboard</h3>
            <div style={{background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.06)'}}>
              <p>Welcome to your dashboard. Add widgets and quick actions here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
