export interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  bookings: string[];
}

export interface BookingRequest {
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
}