
import React, { useState } from 'react';
import '../styles/about.css';
import Modal from './Modal.js';

function About() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const toggleModal = (content = { title: '', body: '' }) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  const cards = [
    {
      className: "health-card",
      imgSrc: "img/healthbear.png",
      altText: "health icon",
      title: "Health",
      modalContent: {
        title: 'Health',
        body: 'Engaging in regular physical activity, eating a balanced diet, and getting adequate rest. Health encompasses a state of complete physical, mental, and social well-being, not just the absence of disease.'
      }
    },
    {
      className: "work-card",
      imgSrc: "img/workbear.png",
      altText: "work icon",
      title: "Work",
      modalContent: {
        title: 'Work',
        body: 'Work involves applying your skills and knowledge to achieve goals, often within a professional setting. It is important to maintain a work-life balance to prevent burnout.'
      }
    },
    {
      className: "personal-card",
      imgSrc: "img/personalbear.png",
      altText: "personal well-being icon",
      title: "Personal",
      modalContent: {
        title: 'Personal Wellness',
        body: 'Personal wellness is about taking care of your emotional and mental well-being. It involves fostering positive relationships, pursuing hobbies, and ensuring time for relaxation.'
      }
    },
    {
      className: "financial-card",
      imgSrc: "img/financialbear.png",
      altText: "financial awareness icon",
      title: "Financial",
      modalContent: {
        title: 'Financial Awareness',
        body: 'Financial wellness is about managing your finances wisely. This includes budgeting, saving, investing, and planning for future needs, which can lead to reduced stress and increased financial stability.'
      }
    }
  ];

  const renderedCards = cards.map((card, index) => (
    <div key={index} className={card.className}>
      <img src={card.imgSrc} alt={card.altText} />
      <h2>{card.title}</h2>
      <button onClick={() => toggleModal(card.modalContent)}>Learn More</button>
    </div>
  ));

  return (
    <div>
      <div className="about-intro">
        <h2>What are healthy habits?</h2>
        <p>
          One of the most remarkable abilities humans possess is the capacity to grow and change to become the person we aspire to be.
          This journey often involves questioning what holds us back. Do I need to be more active? Have I been eating healthily? Should
          I cut back on screen time? Changing habits is a process with many stages, but it all starts with setting clear goals and tracking
          your habits to stay accountable. Over time, these changes can seamlessly integrate into your daily routine, enhancing your overall
          quality of life.
        </p>
      </div>

      <div className="about-deck">
        <div className="example-deck">
          {renderedCards}
        </div>
      </div>

      <div className="about-team">
        <h2>Meet The Team</h2>
        <ul>
          <li><a href="mailto:mhashi@uw.edu">Muhamed Hashi</a></li>
          <li><a href="mailto:tooly206@uw.edu">Abdulbasit Abdalla</a></li>
          <li><a href="mailto:mlli03@uw.edu">Monica Li</a></li>
          <li><a href="mailto:esalas88@uw.edu">Evelyn Salas</a></li>
          <li><a href="mailto:yzhangss@uw.edu">Tony Zhang</a></li>
        </ul>
      </div>

      <div className="about-mission">
        <h2>Our mission</h2>
        <p>
          Our mission is to help individuals cultivate positive habits to improve their
          overall well-being through consistent and manageable practices.
        </p>
      </div>

      {/* Modal component */}
      <Modal show={showModal} onClose={() => toggleModal()} title={modalContent.title}>
        <p>{modalContent.body}</p>
      </Modal>
    </div>
  );
}

export default About;
