import { useState } from 'react';
import { reservationApi } from '../../core/api/reservationApi.js';

export function ReservationFormPage() {
  const [roomId, setRoomId] = useState(1);
  const [userId, setUserId] = useState(1);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      await reservationApi.createReservation({
        roomId: Number(roomId),
        userId: Number(userId),
        startTime,
        endTime
      });
      setMessage('Reservation created successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>New Reservation</h2>
      <form className="form-grid" onSubmit={submit}>
        <div>
          <label htmlFor="room-id">Room ID</label>
          <input type="number" id='room-id' value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="user-id">User ID</label>
          <input type="number" id='user-id' value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="start-time">Start</label>
          <input type="datetime-local" id='start-time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="end-time">End</label>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div>
          <button type="submit">Reserve</button>
        </div>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
