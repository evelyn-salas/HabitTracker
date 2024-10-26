import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, set, onValue, remove } from 'firebase/database';
import Goal from './Goal';
import '../styles/goalsList.css';
import '../styles/habitTracker.css';

function GoalsList() {
  const initialGoalState = { name: '', description: '', category: '', priority: '', progress: 0, requiredActivity: '', totalRequired: 1, deadline: new Date().toISOString().split('T')[0] };

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState(initialGoalState);
  const [formVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);

  useEffect(() => {
    const goalsRef = ref(db, 'goals');
    onValue(goalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const goalsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setGoals(goalsArray);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'progress' ? Number(value) : value;
    setNewGoal(prevGoal => ({ ...prevGoal, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateGoal(editingGoalId, newGoal);
    } else {
      createGoal(newGoal);
    }
    resetForm();
  };

  const createGoal = (goal) => {
    const goalsRef = ref(db, 'goals');
    const newGoalRef = push(goalsRef);
    set(newGoalRef, goal);
  };

  const updateGoal = (id, updatedGoal) => {
    const goalRef = ref(db, `goals/${id}`);
    set(goalRef, updatedGoal);
    setIsEditing(false);
    setEditingGoalId(null);
  };

  const resetForm = () => {
    setNewGoal(initialGoalState);
    setFormVisible(false);
  };

  const handleDelete = (id) => {
    const goalRef = ref(db, `goals/${id}`);
    remove(goalRef)
      .then(() => {
        setGoals(goals.filter(goal => goal.id !== id));
      })
      .catch(error => {
        console.error('Error deleting goal:', error);
      });
  };

  const handleEdit = (id) => {
    const goalToEdit = goals.find(goal => goal.id === id);
    setNewGoal(goalToEdit);
    setEditingGoalId(id);
    setIsEditing(true);
    setFormVisible(true);
  };

  const handleCreate = () => {
    setNewGoal(initialGoalState);
    setIsEditing(false);
    setFormVisible(true);
  };

  const handleToggleStatus = (id) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, status: goal.status === 'active' ? 'inactive' : 'active' } : goal
    );
    setGoals(updatedGoals);
    const goalToUpdate = updatedGoals.find(goal => goal.id === id);
    updateGoal(id, goalToUpdate);
  };

  const goalItems = goals.map(goal => (
    <Goal
      key={goal.id}
      name={goal.name}
      description={goal.description}
      category={goal.category}
      priority={goal.priority}
      progress={Number(goal.progress)}
      status={goal.status}
      dueDate={goal.dueDate}
      onEdit={() => handleEdit(goal.id)}
      onDelete={() => handleDelete(goal.id)}
      onToggleStatus={() => handleToggleStatus(goal.id)}
    />
  ));

  return (
    <div>
      <section className="create-goals">
        <h2>{'Create a Goal'}</h2>
        <button className="toggle-form-btn" onClick={handleCreate}>
          {'Create a Goal'}
        </button>
        {formVisible && (
          <GoalForm
            newGoal={newGoal}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setFormVisible={setFormVisible}
            formType={isEditing ? 'Edit' : 'Create'}
          />
        )}
      </section>

      <div className="goals-container">
        {goalItems}
      </div>
    </div>
  );
}

function GoalForm({ newGoal, isEditing, handleInputChange, handleSubmit, setFormVisible, formType }) {
  return (
    <div className="popup-overlay" role="dialog" aria-labelledby="goal-form-title" aria-modal="true">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={() => setFormVisible(false)} aria-label="Close modal">X</button>
        <h2 id="goal-form-title">{formType} Goal</h2>
        <form onSubmit={handleSubmit} className="compact-goal-form">
          <div className="form-row">
            <label htmlFor="goal-name">Goal Name</label>
            <input type="text" id="goal-name" name="name" value={newGoal.name} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <label htmlFor="goal-category">Category</label>
            <select id="goal-category" name="category" value={newGoal.category} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              <option value="Health">Health</option>
              <option value="Work">Work</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="goal-priority">Priority</label>
            <select id="goal-priority" name="priority" value={newGoal.priority} onChange={handleInputChange} required>
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="goal-progress">Progress</label>
            <input type="range" id="goal-progress" name="progress" value={newGoal.progress} onChange={handleInputChange} min="0" max="100" />
          </div>

          <div className="form-row">
            <label htmlFor="goal-description">Description</label>
            <textarea id="goal-description" name="description" value={newGoal.description} onChange={handleInputChange} required></textarea>
          </div>

          <div className="form-row">
            <label htmlFor="goal-dueDate">Due Date</label>
            <input type="date" id="goal-dueDate" name="dueDate" value={newGoal.dueDate} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <label htmlFor="goal-requiredActivity">Required Activity</label>
            <input type="text" id="goal-requiredActivity" name="requiredActivity" value={newGoal.requiredActivity} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <label htmlFor="goal-totalRequired">Total Required (e.g., number of books, miles, etc.)</label>
            <input type="number" id="goal-totalRequired" name="totalRequired" value={newGoal.totalRequired} onChange={handleInputChange} required />
          </div>

          <button type="submit" className="submit-goal-btn">{isEditing ? 'Update Goal' : 'Add Goal'}</button>
        </form>
      </div>
    </div>
  );
}

export default GoalsList;
