import React from 'react';
import PropTypes from 'prop-types';
import '../styles/goal.css';

function Goal({ name, description, category, priority, progress, status, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className={`goal-item ${status}`}>
      <h3>
        {name} <span className="goal-category">[{category}]</span>
      </h3>
      <p>{description}</p>
      <p>Priority: {priority}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}% Complete</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onToggleStatus}>
        {status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
}

Goal.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
};

export default Goal;
