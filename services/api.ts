import { Property, Booking, Profile, BookingRequest } from '@/types';

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  // Properties
  getProperties: async (): Promise<Property[]> => {
    const response = await fetch(`${API_BASE_URL}/properties`);
    if (!response.ok) throw new Error('Failed to fetch properties');
    return response.json();
  },

  getProperty: async (id: string): Promise<Property> => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    if (!response.ok) throw new Error('Failed to fetch property');
    return response.json();
  },

  searchProperties: async (query: string): Promise<Property[]> => {
    const response = await fetch(
      `${API_BASE_URL}/properties?q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) throw new Error('Failed to search properties');
    return response.json();
  },

  // Bookings
  getBookings: async (): Promise<Booking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  createBooking: async (booking: BookingRequest): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...booking,
        id: Date.now().toString(),
        status: 'confirmed',
      }),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },

  // Profile
  getProfile: async (): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/profile`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },
};
