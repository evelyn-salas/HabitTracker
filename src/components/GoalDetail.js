import React from 'react';
import { useParams } from 'react-router-dom';

function GoalDetail({ goals }) {
  const { id } = useParams();
  const goal = goals.find((g) => g.id === parseInt(id));

  if (!goal) {
    return <h2>Goal not found</h2>;
  }

  return (
    <div>
      <h2>{goal.name}</h2>
      <p>{goal.description}</p>
    </div>
  );
}

export default GoalDetail;