// src/pages/Educator/Courses.jsx

import React, { useEffect, useState } from 'react';
import Nav from '../../Component/Nav'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverURL } from '../../App'; 
import { useNavigate } from 'react-router-dom';
import './Courses.css'; 

// 💡 Placeholder images for demo/empty state. आपको इन्हें अपने assets folder में जोड़ना होगा।
import sampleThumb1 from '../../assets/banner1.png'
import sampleThumb2 from '../../assets/banner11.jpg'
import sampleThumb3 from '../../assets/web-dev-icon.png'

function Courses() {
    const user = useSelector(s => s.user.userData);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [error, setError] = useState(null);
    const [togglingIds, setTogglingIds] = useState({});

    // Example sample courses used as visual demo when there are no created courses
    const sampleCourses = [
        {
            _id: 'sample-1',
            title: 'Intro to React',
            subTitle: 'Build modern UIs with React',
            thumbnail: sampleThumb1,
            price: 0,
            studentsEnrolled: 458
        },
        {
            _id: 'sample-2',
            title: 'Design UX & UI',
            subTitle: 'Design beautiful user experiences',
            thumbnail: sampleThumb2,
            price: 299,
            studentsEnrolled: 102
        },
        {
            _id: 'sample-3',
            title: 'Web Dev Bootcamp',
            subTitle: 'End-to-end web development',
            thumbnail: sampleThumb3,
            price: 499,
            studentsEnrolled: 734
        }
    ]

    // ----------------------
    // API Call to Fetch Creator's Courses
    // ----------------------
    useEffect(() => {
        if (!user || !user._id) {
            setLoadingCourses(false);
            return;
        }

        const fetchCreatorCourses = async () => {
            try {
                setLoadingCourses(true);
                setError(null);
                const res = await axios.get(`${serverURL}/api/course/getcreator`, { withCredentials: true });
                setCourses(res.data.courses || []);
            } catch (err) {
                console.error('Failed to fetch creator courses:', err);
                setError('Failed to load courses. Please try again.');
                setCourses([]);
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchCreatorCourses();
    }, [user]); 

    
    const handleEdit = (courseId) => {
        navigate(`/edit-course/${courseId}`);
    };

    const handleDelete = async (courseId, courseTitle) => {
        if (window.confirm(`Are you sure you want to delete the course: "${courseTitle}"?`)) {
            try {
                // Delete API call
                await axios.delete(`${serverURL}/api/course/delete/${courseId}`, { withCredentials: true });
         
                setCourses(courses.filter(c => c._id !== courseId));
                alert(`Course "${courseTitle}" deleted successfully!`);
            } catch (err) {
                console.error('Failed to delete course:', err);
                alert('Failed to delete course. It might be enrolled by students.');
            }
        }
    };

    const handleTogglePublish = async (courseId, currentState) => {
        if (String(courseId).startsWith('sample')) return; // Sample courses cannot be toggled

        try {
            setTogglingIds(prev => ({ ...prev, [courseId]: true }));
            const res = await axios.patch(`${serverURL}/api/course/publish/${courseId}`, { isPublished: !currentState }, { withCredentials: true });
            const updated = res.data.course;
            setCourses(prev => prev.map(c => c._id === courseId ? updated : c));
        } catch (err) {
            console.error('Failed to toggle publish state:', err);
            alert('Failed to update publish status.');
        } finally {
            setTogglingIds(prev => {
                const copy = { ...prev };
                delete copy[courseId];
                return copy;
            });
        }
    };

    if (!user) {
        return <div className="courses-page-container">Please login to view your courses.</div>;
    }

    return (
        <div className="courses-page-container">
            <Nav userData={user} />
            
            <div className="courses-content-area">
                <h1 className="courses-page-heading">
                    Manage Your Courses ({courses.length})
                </h1>
                
                {/* Add New Course Button */}
                <button 
                    className="create-new-course-btn"
                    onClick={() => navigate('/createcourse')}
                >
                    + Create New Course
                </button>

                {error && <p className="courses-error-message">{error}</p>}
                
                {loadingCourses ? (
                    <div className="courses-loading-area">
                        <p>Loading your courses...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="courses-empty-state">
                        <p>You haven't created any courses yet.</p>
                        <button className="create-new-course-btn" onClick={() => navigate('/createcourse')}>
                            Start Creating Your First Course
                        </button>

                        {/* Show sample/demo courses so educators know how content will look */}
                        <div style={{ marginTop: 18 }}>
                            <h3 style={{ marginBottom: 12, fontWeight: 700 }}>Example Courses (Preview)</h3>
                            <div className="courses-grid">
                                {sampleCourses.map((c) => (
                                    <div key={c._id} className="course-management-card">
                                            <span className={`course-badge draft`}>Draft</span>
                                        <img src={c.thumbnail} alt={c.title} className="course-card-thumbnail" />
                                        <div className="course-card-details">
                                            <h4 className="course-card-title">{c.title}</h4>
                                            <p className="course-card-subtitle">{c.subTitle}</p>
                                            <div className="course-card-stats">
                                                <span>Students: {c.studentsEnrolled}</span>
                                                <span>Price: {c.price ? `₹${c.price}` : 'Free'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="courses-grid">
                        {courses.map((c) => (
                            <div key={c._id} className="course-management-card">
                                        {/* Badge */}
                                        <span className={`course-badge ${c.isPublished ? 'published' : 'draft'}`}>{c.isPublished ? 'Published' : 'Draft'}</span>

                                <img 
                                    src={c.thumbnail || '/path/to/course-fallback.png'} 
                                    alt={c.title} 
                                    className="course-card-thumbnail"
                                />
                                <div className="course-card-details">
                                    <h4 className="course-card-title">{c.title}</h4>
                                    <p className="course-card-subtitle">{c.subTitle || c.description?.slice(0, 60)}...</p>
                                    
                                    <div className="course-card-stats">
                                        <span>Students: {c.studentsEnrolled || 0}</span>
                                        <span>Price: {c.price ? `₹${c.price}` : 'Free'}</span>
                                    </div>

                                    <div className="course-card-actions">
                                        <button 
                                            className="course-card-btn edit-btn"
                                            onClick={() => handleEdit(c._id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="course-card-btn delete-btn"
                                            onClick={() => handleDelete(c._id, c.title)}
                                        >
                                            Delete
                                        </button>
                                        {/* Publish toggle */}
                                        <div className="publish-toggle-wrap">
                                            <span className="publish-label">
                                                {togglingIds[c._id] ? (
                                                    <span className="loading"></span>
                                                ) : (
                                                    (c.isPublished ? 'Live' : 'Draft')
                                                )}
                                            </span>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={!!c.isPublished}
                                                    onChange={() => handleTogglePublish(c._id, !!c.isPublished)}
                                                    disabled={togglingIds[c._id]}
                                                />
                                                <span className="slider round" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Courses;