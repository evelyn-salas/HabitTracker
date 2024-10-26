import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../firebase';
import { VictoryChart, VictoryBar, VictoryLegend, VictoryAxis } from 'victory';
import '../styles/habitTracker.css';

function HabitTracker() {
  const [activityLogs, setActivityLogs] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: '', date: '', type: '', duration: 0 });

  useEffect(() => {
    const activitiesRef = ref(db, 'activities');
    onValue(activitiesRef, (snapshot) => {
      const data = snapshot.val();
      const logs = data ? Object.values(data) : [];
      setActivityLogs(logs);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activityId = Date.now();
    const activityRef = ref(db, `activities/${activityId}`);
    set(activityRef, { ...newActivity });
    setNewActivity({ name: '', date: '', type: '', duration: 0 });
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'Health': return "#4CAF50";
      case 'Work': return "#2196F3";
      case 'Personal Development': return "#FF9800";
      case 'Other': return "#9C27B0";
      default: return "#888";
    }
  };

  return (
    <div className="habit-tracker">
      <form onSubmit={handleSubmit} className="activity-form">
        <div className="form-row">
          <label htmlFor="name">Activity Name</label>
          <input type="text" id="name" name="name" value={newActivity.name} onChange={handleInputChange} required />
        </div>
        <div className="form-row">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={newActivity.date} onChange={handleInputChange} required />
        </div>
        <div className="form-row">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={newActivity.type} onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <option value="Health">Health</option>
            <option value="Work">Work</option>
            <option value="Personal Development">Personal Development</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="duration">Duration (min)</label>
          <input type="number" id="duration" name="duration" value={newActivity.duration} onChange={handleInputChange} required />
        </div>
        <button type="submit">Log Activity</button>
      </form>

      <VictoryChart domainPadding={20}>
        <VictoryLegend
          x={50}
          y={10}
          orientation="horizontal"
          gutter={10}
          style={{
            border: { stroke: "black" },
            title: { fontSize: 14 },
            labels: { fontSize: 10 },
          }}
          data={[
            { name: "Health", symbol: { fill: "#4CAF50", type: "square", size: 8 } },
            { name: "Work", symbol: { fill: "#2196F3", type: "square", size: 8 } },
            { name: "Personal Development", symbol: { fill: "#FF9800", type: "square", size: 8 } },
            { name: "Other", symbol: { fill: "#9C27B0", type: "square", size: 8 } }
          ]}
        />
        <VictoryAxis
          style={{ tickLabels: { fontSize: 8, padding: 5 } }}
          tickFormat={(x) => new Date(x).toLocaleDateString()}
        />
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: 10, fontFamily: 'Arial' } }}
        />
        <VictoryBar
          data={activityLogs}
          x="date"
          y="duration"
          style={{
            data: {
              fill: ({ datum }) => getActivityColor(datum.type),
              width: 20
            }
          }}
        />
      </VictoryChart>

      <div className="activity-log-list">
        <h3>Past Activities</h3>
        <ul>
          {activityLogs.map((log, index) => (
            <li key={index}>
              <strong>{log.name}:</strong> {log.type}, {log.duration} minutes on {new Date(log.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HabitTracker;
