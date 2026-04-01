const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function parseResponse(response) {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorBody.error || 'Unexpected error');
  }

  if (response.status === 204) return null;
  return response.json();
}

export const reservationApi = {
  async getAvailableRooms(startTime, endTime) {
    const params = new URLSearchParams({ startTime, endTime });
    const response = await fetch(`${BASE_URL}/rooms/available?${params.toString()}`);
    return parseResponse(response);
  },

  async createReservation(payload) {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return parseResponse(response);
  },

  async getUserReservations(userId) {
    const response = await fetch(`${BASE_URL}/reservations/user/${userId}`);
    return parseResponse(response);
  },

  async cancelReservation(id) {
    const response = await fetch(`${BASE_URL}/reservations/${id}`, {
      method: 'DELETE'
    });
    return parseResponse(response);
  }
};
