import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  User,
  Mail,
  Calendar,
  Settings,
  LogOut,
  TicketCheck,
  ReceiptText,
} from 'lucide-react-native';
import { useProfile } from '@/hooks/useProfile';
import { useBookings } from '@/hooks/useBookings';

export default function ProfileScreen() {
  const { data: profile, refetch } = useProfile();
  const { data: bookings } = useBookings();

  const userBookings =
    bookings?.filter((booking) => booking.userId === profile?.id) || [];
  const confirmedBookings = userBookings.filter(
    (booking) => booking.status === 'confirmed',
  );

  const profileStats = [
    {
      icon: ReceiptText,
      label: 'Total Bookings',
      value: userBookings.length.toString(),
      color: '#007AFF',
    },
    {
      icon: TicketCheck,
      label: 'Confirmed',
      value: confirmedBookings.length.toString(),
      color: '#32D74B',
    },
  ];

  const menuItems = [
    {
      icon: Settings,
      label: 'Settings',
      color: '#8E8E93',
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      color: '#FF3B30',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FF]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-20 gap-10"
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} />
        }
      >
        <View className="mt-12">
          <Text className="text-start text-3xl font-semibold">My Profile</Text>
        </View>

        {profile && (
          <>
            <View className="items-center">
              <View className="flex size-32 items-center justify-center rounded-full bg-[#E3F2FD]">
                <User size={50} color="#007AFF" strokeWidth={2} />
              </View>
              <Text className="mt-1 text-2xl font-semibold">
                {profile.name}
              </Text>
              <View className="flex flex-row items-center justify-center gap-2">
                <Mail size={18} color="#8E8E93" strokeWidth={2} />
                <Text className="text-lg text-[#8E8E93]">{profile.email}</Text>
              </View>
            </View>
            <View className="">
              <Text className="mb-5 border-b border-b-neutral-200 pb-2 text-xl font-semibold">
                Booking Statistics
              </Text>
              <View className="flex flex-row gap-3">
                {profileStats.map((stat, index) => (
                  <View
                    key={index}
                    className="flex-1 items-center rounded-3xl bg-white p-4"
                  >
                    <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                      <stat.icon size={25} color="black" strokeWidth={2} />
                    </View>
                    <Text className="mb-1 text-xl font-semibold text-[#1C1C1E]">
                      {stat.value}
                    </Text>
                    <Text className="text-center text-sm text-[#8E8E93]">
                      {stat.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="mb-24">
              <Text className="mb-5 border-b border-b-neutral-200 pb-2 text-xl font-semibold">
                Account
              </Text>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="mb-5 rounded-full bg-white"
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center p-4 px-5">
                    <item.icon size={20} color={item.color} strokeWidth={2} />
                    <Text
                      className="ml-3 text-lg font-medium"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
