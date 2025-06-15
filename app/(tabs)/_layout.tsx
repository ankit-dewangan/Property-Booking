import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { RoundedTabBar } from '@/components/RoundedTabBar';

export default function Layout() {
  const pathname = useRoute();

  useEffect(() => {
    console.log(pathname.name);
  }, [pathname]);

  return (
    <Tabs>
      <TabSlot />
      <RoundedTabBar />
      <TabList className="hidden">
        <TabTrigger name="home" href="/" />
        <TabTrigger name="bookings" href="/(tabs)/bookings" />
        <TabTrigger name="profile" href="/(tabs)/profile" />
      </TabList>
    </Tabs>
  );
}
