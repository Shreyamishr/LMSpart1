import React from 'react';
import { 
  FaGraduationCap, 
  FaLock, 
  FaGem, 
  FaLifeRing, 
  FaHandshake 
} from 'react-icons/fa';
import './logos.css';

function Logos() {
  return (
    <div className="featureRow">
      <div className="featureChip">
        <span className="featureChip__icon">
          <FaGraduationCap />
        </span>
        <span className="featureChip__text">20k+ online Courses</span>
      </div>

      <div className="featureChip">
        <span className="featureChip__icon">
          <FaLock />
        </span>
        <span className="featureChip__text">Lifetime Access</span>
      </div>

      <div className="featureChip">
        <span className="featureChip__icon">
          <FaGem />
        </span>
        <span className="featureChip__text">Value for money</span>
      </div>

      <div className="featureChip">
        <span className="featureChip__icon">
          <FaLifeRing />
        </span>
        <span className="featureChip__text">Lifetime Support</span>
      </div>

      <div className="featureChip">
        <span className="featureChip__icon">
          <FaHandshake />
        </span>
        <span className="featureChip__text">Community Support</span>
      </div>
    </div>
  );
}

export default Logos;