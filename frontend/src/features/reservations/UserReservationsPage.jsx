import { useState } from 'react';
import { reservationApi } from '../../core/api/reservationApi.js';

export function UserReservationsPage() {
  const [userId, setUserId] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const data = await reservationApi.getUserReservations(Number(userId));
      setReservations(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const cancel = async (id) => {
    setError('');
    try {
      await reservationApi.cancelReservation(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>User Reservations</h2>
      <div className="form-grid">
        <div>
          <label>User ID</label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <button onClick={load}>Load</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            Room {reservation.roomId} | {new Date(reservation.startTime).toLocaleString()} - {new Date(reservation.endTime).toLocaleString()} | {reservation.status}
            {reservation.status === 'ACTIVE' && (
              <> <button onClick={() => cancel(reservation.id)}>Cancel</button></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
