// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import Nav from '../../Component/Nav';
import { useSelector } from 'react-redux';
import UserProfileCard from '../../components/UserProfileCard'; 
import './Dashboard.css'; 
import axios from 'axios'
import { serverURL } from '../../App'
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------
// A. Reusable Chart Component (Embedded)
// ----------------------------------------------------

const DashboardChart = ({ title, data }) => {
    const maxCount = 8; 
    
    return (
        <div className="dashboard-chart-container">
            <h3 className="dashboard-chart-title">{title}</h3>
            <div className="dashboard-chart-grid">
                {/* Y-Axis Labels (8, 6, 4, 2) */}
                <div className="dashboard-chart-y-axis">
                    {[8, 6, 4, 2, 0].map((label, index) => (
                        <span key={index}>{label !== 0 ? label : ''}</span>
                    ))}
                </div>
                
                {/* Bars */}
                <div className="dashboard-chart-bars">
                    {data.map((item, index) => {
                        const heightPercent = (item.count / maxCount) * 100;
                        return (
                            <div key={index} className="dashboard-chart-bar-wrapper">
                                <div 
                                    className="dashboard-chart-bar" 
                                    style={{ height: `${heightPercent}%` }}
                                ></div>

                                <p className="dashboard-chart-bar-label">{item.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


// ----------------------------------------------------
// B. Main Dashboard Component
// ----------------------------------------------------

// 💡 Mock Data (if Redux state doesn't provide them initially)
const mockCourseProgressData = [
    { label: "Complete H...", count: 6 },
    { label: "Complete J...", count: 2 },
    { label: "Ultimate B...", count: 2 },
    { label: "AI POWERED...", count: 3 },
    { label: "Python D...", count: 1 },
];

const mockStudentEnrollmentData = [
    { label: "Complete H...", count: 5 },
    { label: "Complete J...", count: 3 },
    { label: "Ultimate B...", count: 2 },
    { label: "AI POWERED...", count: 1 },
    { label: "Python D...", count: 2 },
];


function Dashbord() {
  
    const user = useSelector(s => s.user.userData);
    const navigate = useNavigate();

    const userName = user?.name || "Ankush Sahu";
    const userRole = user?.role || "CSE Student";
    const totalEarning = user?.totalEarning !== undefined ? `₹${user.totalEarning}` : '₹3,582';

    // Data sources (backend data preferred, mock data as fallback)
    const courseProgressData = user?.courseProgressData || mockCourseProgressData;
    const studentEnrollmentData = user?.studentEnrollmentData || mockStudentEnrollmentData;

    const [courses, setCourses] = useState([])
    const [loadingCourses, setLoadingCourses] = useState(false)

    // Fetching courses created by the educator
    useEffect(() => {
        const fetchCreatorCourses = async () => {
            // Only fetch if user data is available
            if (!user || !user._id) return; 

            try {
                setLoadingCourses(true)
                const res = await axios.get(`${serverURL}/api/course/getcreator`, { withCredentials: true })
                setCourses(res.data.courses || [])
            } catch (err) {
                console.error('Failed to fetch creator courses', err)
            } finally {
                setLoadingCourses(false)
            }
        }
        fetchCreatorCourses()
    }, [user])


    return (
        <div className="educator-dashboard-page-container">
            <Nav userData={user} />
            
            <div className="dashboard-content-area">
                
                {/* 1. Top Educator Card */}
                <div className="dashboard-top-card">
                 
                    <div className="dashboard-back-arrow" onClick={() => navigate(-1)}>
                        <span style={{ fontSize: '24px' }}>&larr;</span>
                    </div>

                    <div className="dashboard-header-main">
                        <div className="dashboard-profile-avatar">
                           
                            <img 
                                src={user?.photourl || user?.profileImageURL || "/path/to/default-image.jpg"} 
                                alt="Profile" 
                                className="dashboard-profile-img"
                            /> 
                        </div>
                        <div className="dashboard-header-info">
                            <h2 className="dashboard-welcome-heading">
                                Welcome, {userName} <span role="img" aria-label="hand wave">👋</span>
                            </h2>
                            <p className="dashboard-earning">
                                Total Earning: <span className="dashboard-earning-amount">{totalEarning}</span>
                            </p>
                            <p className="dashboard-role">{userRole}</p>
                            
                            <button className="dashboard-create-course-btn">
                                Create Courses
                            </button>
                        </div>
                    </div>
                </div>


                {/* 2. Charts / Stats Grid */}
                <div className="dashboard-stats-grid">
                    <DashboardChart 
                        title="Course Progress (Lectures)"
                        data={courseProgressData}
                    />
                    <DashboardChart 
                        title="Student Enrollment"
                        data={studentEnrollmentData}
                    />
                </div>

                {/* 3. My Courses (Created by educator) */}
                <div className="dashboard-courses-section">
                    <h3 className="dashboard-courses-heading">My Courses</h3>
                    {loadingCourses ? (
                        <div className="dashboard-loading-area">
                            <p>Loading courses...</p>
                        </div>
                    ) : courses && courses.length ? (
                        <div className="dashboard-course-grid">
                            {courses.map((c) => (
                                <div key={c._id} className="course-card-item">
                                    <img 
                                        src={c.thumbnail || '/path/to/course-fallback.png'} 
                                        alt={c.title} 
                                        className="course-card-thumbnail"
                                    />
                                    <div className="course-card-details">
                                        <h4 className="course-card-title">{c.title}</h4>
                                        <p className="course-card-subtitle">{c.subTitle || c.description?.slice(0, 60)}...</p>
                                        <div className="course-card-actions">
                                            <button className="course-card-btn view-btn">View Details</button>
                                            <button className="course-card-btn edit-btn">Edit</button>
                                      </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="dashboard-loading-area">
                            <p>You haven't created any courses yet.</p>
                            <button className="dashboard-create-course-btn" style={{ marginTop: 10 }}>Create First Course</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashbord;