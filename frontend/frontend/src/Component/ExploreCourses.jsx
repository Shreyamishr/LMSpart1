import React from "react";
import './ExploreCourses.css';
import webDevIcon from '../assets/web-dev-icon.png'; 
import uiuxIcon from '../assets/uiux-icon.png';
import appDevIcon from '../assets/app-dev-icon.png';
import ethicalHackingIcon from '../assets/ethical-hacking-icon.png';
import aiMlIcon from '../assets/ai-ml-icon.png';
import dataScienceIcon from '../assets/data-science-icon.png';
import dataAnalyticsIcon from '../assets/data-analytics-icon.png';
import aiToolsIcon from '../assets/ai-tools-icon.png';



const courseData = [
    { name: "Web Development", icon: webDevIcon, colorClass: "purple" },
    { name: "UI/UX Designing", icon: uiuxIcon, colorClass: "green" },
    { name: "App Development", icon: appDevIcon, colorClass: "pink" },
    { name: "Ethical Hacking", icon: ethicalHackingIcon, colorClass: "dark" },
    { name: "AI/ML", icon: aiMlIcon, colorClass: "light-green" },
    { name: "Data Science", icon: dataScienceIcon, colorClass: "red" },
    { name: "Data Analytics", icon: dataAnalyticsIcon, colorClass: "dark" },
    { name: "AI Tools", icon: aiToolsIcon, colorClass: "light-green" },
];

function ExploreCourses() {
    return (
        <div className="explore-courses-section">
            <div className="explore-courses-content-left">
                <p className="explore-courses-subheading">Explore</p>
                <h1 className="explore-courses-heading">Our Courses</h1>
                <p className="explore-courses-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel iure explicabo laboriosam accusantium expedita laudantium facere magnam.
                </p>
                <button className="explore-courses-button">
                    Explore Courses
                    <span className="explore-courses-arrow">❯</span>
                </button>
            </div>

            <div className="explore-courses-grid-right">
                {courseData.map((course, index) => (
                    <div 
                        key={index} 
                        className={`explore-courses-card explore-courses-card-${course.colorClass}`}
                    >
                        {/* 🖼️ JSX में इमेज का उपयोग */}
                        <img src={course.icon} alt={course.name} className="explore-courses-icon" />
                        <p className="explore-courses-card-name">{course.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExploreCourses;
