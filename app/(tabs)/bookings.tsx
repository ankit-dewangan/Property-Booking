import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BookingCard } from '@/components/BookingCard';
import { useBookings } from '@/hooks/useBookings';
import { useProperties } from '@/hooks/useProperties';

export default function BookingsScreen() {
  const router = useRouter();
  const { data: bookings, isLoading: bookingsLoading, refetch } = useBookings();
  const { data: properties } = useProperties();

  const getPropertyById = (propertyId: string) => {
    return properties?.find((property) => property.id === propertyId);
  };

  const handleBookingPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FF]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-20 gap-5"
        refreshControl={
          <RefreshControl refreshing={bookingsLoading} onRefresh={refetch} />
        }
      >
        <View className="mt-12">
          <Text className="text-start text-3xl font-semibold">My Bookings</Text>
          <Text className="text-lg text-[#8E8E93]">
            Keep track of your reservations
          </Text>
        </View>
        <View>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => {
              const property = getPropertyById(booking.propertyId);
              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  property={property}
                  onPress={() => handleBookingPress(booking.propertyId)}
                />
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No bookings yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start exploring properties and make your first booking!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
});
