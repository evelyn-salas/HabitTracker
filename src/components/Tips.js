import React from 'react';
import '../styles/tips.css';

function Tips() {
  const renderedImages = [
    <img key="1" src="img/tips1.jpg" alt="Start small and be consistent." />,
    <img key="2" src="img/tips2.jpg" alt="Set realistic and achievable goals." />
  ];

  return (
    <div className="habit-tips">
      <h2>Tips and Insights</h2>
      {renderedImages}
      <p>Here are some tips to help you build and maintain healthy habits:</p>
      <ul>
        <li>Start small and be consistent.</li>
        <li>Set realistic and achievable goals.</li>
        <li>Track your progress regularly.</li>
        <li>Stay motivated by rewarding yourself.</li>
      </ul>
    </div>
  );
}

export default Tips;
