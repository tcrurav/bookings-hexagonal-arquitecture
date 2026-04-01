import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="container">
      <h1>Reservation Management</h1>
      <nav>
        <Link to="/rooms">Available Rooms</Link>
        <Link to="/new-reservation">New Reservation</Link>
        <Link to="/my-reservations">User Reservations</Link>
      </nav>
      <Outlet />
    </div>
  );
}
