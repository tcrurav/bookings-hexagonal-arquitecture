import { useState } from 'react';
import { reservationApi } from '../../core/api/reservationApi.js';

export function RoomsPage() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  const search = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const data = await reservationApi.getAvailableRooms(startTime, endTime);
      setRooms(data);
    } catch (err) {
      setRooms([]);
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Available Rooms</h2>
      <form className="form-grid" onSubmit={search}>
        <div>
          <label htmlFor="start-time">Start</label>
          <input type="datetime-local" id='start-time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="end-time">End</label>
          <input type="datetime-local" id='end-time' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name} - Capacity: {room.capacity}</li>
        ))}
      </ul>
    </div>
  );
}
