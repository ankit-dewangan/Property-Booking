import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Check,
  ArrowRight,
} from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import { useProperty } from '@/hooks/useProperties';
import { useCreateBooking } from '@/hooks/useBookings';

const screenWidth = Dimensions.get('window').width;

export default function PropertyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: property, isLoading } = useProperty(id as string);
  const createBookingMutation = useCreateBooking();

  const handleBookProperty = () => {
    if (!property) return;

    const checkInDate = new Date();
    checkInDate.setDate(checkInDate.getDate() + 1);

    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 8);

    const bookingRequest = {
      propertyId: property.id,
      userId: 'user1',
      checkIn: checkInDate.toISOString().split('T')[0],
      checkOut: checkOutDate.toISOString().split('T')[0],
    };

    createBookingMutation.mutate(bookingRequest, {
      onSuccess: () => {
        Alert.alert(
          'Booking Confirmed!',
          'Your booking has been successfully created.',
          [
            {
              text: 'View Bookings',
              onPress: () => router.push('/bookings'),
            },
            {
              text: 'OK',
              style: 'default',
            },
          ],
        );
      },
      onError: () => {
        Alert.alert(
          'Booking Failed',
          'There was an error creating your booking. Please try again.',
          [{ text: 'OK' }],
        );
      },
    });
  };

  if (isLoading || !property) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">Loading property...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mb-4 mt-12 flex-row items-center px-5">
          <TouchableOpacity
            className="mr-5 items-center justify-center rounded-full bg-black p-2.5"
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <ArrowLeft size={25} color="#F8F9FF" strokeWidth={2} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Property Details</Text>
        </View>

        <View className="relative rounded-3xl">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              setSelectedImageIndex(index);
            }}
          >
            {property.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: screenWidth, height: 250 }}
              />
            ))}
          </ScrollView>
          <View className="absolute bottom-4 left-0 right-0 flex-row items-center justify-center">
            {property.images.map((_, index) => (
              <View
                key={index}
                className={`mx-1 h-2.5 w-2.5 rounded-full ${selectedImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </View>
        </View>

        <View className="px-5 py-4">
          <View className="mb-6">
            <Text className="mb-3 text-2xl font-semibold tracking-tight text-[#1C1C1E]">
              {property.title}
            </Text>
            <View className="flex-row items-baseline">
              <Text className="text-3xl font-thin text-[#1C1C1E]">
                ${property.price}
              </Text>
              <Text className="ml-1 text-base font-light text-gray-500">
                per month
              </Text>
            </View>
          </View>

          {/* Location Section */}
          <View className="mb-8 border-l-4 border-black pl-3">
            <View className="flex-row items-start">
              <MapPin
                size={18}
                color="black"
                strokeWidth={1.5}
                className="mt-0.5"
              />
              <View className="ml-3 flex-1">
                <Text className="mb-1 text-base font-medium text-[#1C1C1E]">
                  {property.location.address}
                </Text>
                <Text className="text-sm font-light tracking-wide text-gray-600">
                  {property.location.city}, {property.location.state}
                </Text>
              </View>
            </View>
          </View>

          {/* Features Section */}
          <View className="mb-4">
            <View className="mb-5 flex-row items-center">
              <View className="h-px flex-1 bg-gray-300" />
              <Text className="mx-4 text-xs font-medium uppercase tracking-widest text-gray-500">
                Amenities
              </Text>
              <View className="h-px flex-1 bg-gray-300" />
            </View>

            <View className="space-y-3">
              {property.features.map((feature, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="mr-3 size-2 rounded-full bg-black" />
                  <Text className="text-base font-light tracking-wide text-[#1C1C1E]">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <View className="mb-5 flex-row items-center">
              <View className="h-px flex-1 bg-gray-300" />
              <Text className="mx-4 text-xs font-medium uppercase tracking-widest text-gray-500">
                Location
              </Text>
              <View className="h-px flex-1 bg-gray-300" />
            </View>
            <MapView
              className="rounded-3xl"
              style={{ height: 200, width: '100%' }}
              initialRegion={{
                latitude: property.location.coordinates.latitude,
                longitude: property.location.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: property.location.coordinates.latitude,
                  longitude: property.location.coordinates.longitude,
                }}
                title={property.title}
                description={property.location.address}
              />
            </MapView>
          </View>
        </View>
      </ScrollView>

      <View className="border-t border-gray-300 px-5 py-4">
        <TouchableOpacity
          className={`flex-row items-center justify-center rounded-xl bg-black py-4 ${createBookingMutation.isPending && 'opacity-60'}`}
          onPress={handleBookProperty}
          disabled={createBookingMutation.isPending}
          activeOpacity={0.8}
        >
          <Text className="mr-3 text-lg font-semibold text-white">
            {createBookingMutation.isPending ? 'Booking...' : 'Book Now'}
          </Text>
          <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
