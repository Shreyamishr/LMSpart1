import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import "../App.css";

import bannerImage from "../assets/banner1.png";
import "./home.css";

import { FaGraduationCap, FaArrowRight, FaPlay } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Logos from "../Component/logos";
import ExploreCourses from "../Component/ExploreCourses";

function Home() {
  const userData = useSelector((state) => state.user.userData);

  const displayName = userData?.name
    ? userData.name.toUpperCase()
    : "TOWNMANOR IT TEAM";
  const displayRole = userData?.role ? userData.role.toUpperCase() : "STUDENT";

  return (
    <div className="home">
      <Nav userData={userData} />

      {/* IMPORTANT: This wrapper keeps content BELOW Nav */}
      <div className="home__content">
        <div className="home__container">
          {/* Welcome badge (now properly below nav) */}
          <div className="home__welcomeRow">
            <div className="welcomeBadge">
              <span className="welcomeBadge__dot" />
              <span className="welcomeBadge__text">
                WELCOME BACK, {displayName}
              </span>
              <span className="welcomeBadge__pill">{displayRole}</span>
            </div>
          </div>

          <div className="home__grid">
            {/* LEFT */}
            <div className="home__left">
              <div className="home__heading">
                <h1 className="home__title">Virtual Courses</h1>
                <h2 className="home__subtitle">
                  <span className="home__subtitleDark">Learn Anytime,</span>
                  <br />
                  <span className="home__subtitleLight">Anywhere.</span>
                </h2>
              </div>

              <p className="home__desc">
                Access over 5,000 expertly crafted lessons designed to propel
                your career forward. Learning has never been this flexible.
              </p>

              <div className="home__actions">
                {/* Search with AI (button-style) */}
                <Link to="/ai-search" className="searchBtn">
                  <AiOutlineSearch className="searchBtn__icon" />
                  <span className="searchBtn__text">Search with AI...</span>
                </Link>

                <Link to="/courses" className="primaryBtn">
                  View All Courses
                </Link>
              </div>

              <div className="home__socialProof">
                <div className="avatars">
                  <img
                    src="https://i.pravatar.cc/40?img=1"
                    alt="Student"
                    className="avatar"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=2"
                    alt="Student"
                    className="avatar"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=3"
                    alt="Student"
                    className="avatar"
                  />
                  <div className="avatar avatar--count">+2k</div>
                </div>
                <span className="home__proofText">
                  Joined by 2,000+ students this week
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="home__right">
              <div className="heroCard">
                <img
                  src={bannerImage}
                  alt="Learning"
                  className="heroCard__image"
                />

                <div className="continueCard">
                  <div className="continueCard__left">
                    <div className="playBox">
                      <FaPlay className="playBox__icon" />
                    </div>

                    <div className="continueCard__info">
                      <div className="continueCard__label">
                        CONTINUE LEARNING
                      </div>
                      <div className="continueCard__title">
                        Introduction to UX Design
                      </div>

                      <div className="progress">
                        <div className="progress__bar" style={{ width: "65%" }} />
                      </div>
                    </div>
                  </div>

                  <button className="arrowBtn" type="button">
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              <div className="capBadge">
                <FaGraduationCap />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Logos / feature row inserted at bottom */}
      <div className="home__logos">
        <Logos />
        <ExploreCourses/>
      </div>
    </div>
  );
}

export default Home;