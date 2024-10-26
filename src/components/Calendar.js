import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import Modal from './Modal';
import '../styles/calendar.css';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const goalsRef = ref(db, 'goals');
    onValue(goalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.keys(data).map(key => {
          const goal = data[key];
          return {
            id: key,
            title: goal.name,
            start: goal.dueDate,
            color: '#E5D2A1',
            extendedProps: { ...goal },
          };
        });
        setEvents(eventsArray);
      }
    });
  }, []);

  const handleEventClick = (info) => {
    const goal = info.event.extendedProps;
    setSelectedGoal(goal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGoal(null);
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        editable={true}
        droppable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />

      {modalVisible && selectedGoal && (
        <Modal show={modalVisible} onClose={closeModal} title={selectedGoal.name}>
          <p><strong>Description:</strong> {selectedGoal.description}</p>
          <p><strong>Category:</strong> {selectedGoal.category}</p>
          <p><strong>Priority:</strong> {selectedGoal.priority}</p>
          <p><strong>Progress:</strong> {selectedGoal.progress}%</p>
          <p><strong>Required Activity:</strong> {selectedGoal.requiredActivity}</p>
          <p><strong>Total Required:</strong> {selectedGoal.totalRequired}</p>
          <p><strong>Due Date:</strong> {selectedGoal.dueDate}</p>
        </Modal>
      )}
    </div>
  );
}

export default Calendar;
