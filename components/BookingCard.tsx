import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { Booking, Property } from '@/types';

interface BookingCardProps {
  booking: Booking;
  property?: Property;
  onPress?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  property,
  onPress,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusClasses = () => {
    switch (booking.status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = () => {
    switch (booking.status) {
      case 'confirmed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '✕';
      default:
        return '•';
    }
  };

  return (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-[2rem] bg-white"
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View className="p-5">
        <View className="mb-4">
          <View className="mb-2 flex-row items-center">
            <View
              className={`flex-row items-center rounded-full border px-3 py-1.5 ${getStatusClasses()}`}
            >
              <Text className="mr-1 text-sm font-medium">
                {getStatusIcon()}
              </Text>
              <Text className="text-sm font-medium">
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Text>
            </View>
          </View>

          <Text className="text-xl font-bold leading-tight text-gray-900">
            {property?.title || `Property #${booking.propertyId}`}
          </Text>
        </View>

        {property && (
          <View className="mb-5 flex-row items-center">
            <View className="rounded-full bg-neutral-100 p-2">
              <MapPin size={16} color="black" strokeWidth={2.5} />
            </View>
            <Text className="ml-3 text-base font-medium text-gray-700">
              {property.location.city}, {property.location.state}
            </Text>
          </View>
        )}

        <View className="flex-row items-center self-start rounded-2xl bg-black px-4 py-3">
          <Calendar size={18} color="#F8F9FF" strokeWidth={2} />
          <Text className="ml-3 text-sm font-medium text-[#F8F9FF]">
            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
