import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { BookingRequest } from '@/types';
import { useBookingStore } from '@/stores/useBookingStore';

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: api.getBookings,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const addBooking = useBookingStore((state) => state.addBooking);

  return useMutation({
    mutationFn: (booking: BookingRequest) => api.createBooking(booking),
    onSuccess: (newBooking) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      addBooking(newBooking);
    },
  });
};