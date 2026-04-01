import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './shared/components/Layout.jsx';
import { RoomsPage } from './features/rooms/RoomsPage.jsx';
import { ReservationFormPage } from './features/reservations/ReservationFormPage.jsx';
import { UserReservationsPage } from './features/reservations/UserReservationsPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/rooms" replace />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="new-reservation" element={<ReservationFormPage />} />
        <Route path="my-reservations" element={<UserReservationsPage />} />
      </Route>
    </Routes>
  );
}
