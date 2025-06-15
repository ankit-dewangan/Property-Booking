import { View, Pressable, Keyboard } from 'react-native';
import { TabTrigger, TabTriggerSlotProps } from 'expo-router/ui';
import { BookMarked, Home, UserRound, LucideIcon } from 'lucide-react-native';
import { forwardRef, useEffect, useState } from 'react';

export function RoundedTabBar() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View className="elevation-md absolute bottom-2 left-[24%] right-[24%] flex flex-row justify-center rounded-full bg-white p-1">
      <TabTrigger name="home" asChild>
        <CustomTabButton icon={Home} />
      </TabTrigger>
      <TabTrigger name="bookings" asChild>
        <CustomTabButton icon={BookMarked} />
      </TabTrigger>
      <TabTrigger name="profile" asChild>
        <CustomTabButton icon={UserRound} />
      </TabTrigger>
    </View>
  );
}

interface CustomTabButtonProps extends TabTriggerSlotProps {
  icon: LucideIcon;
}

export const CustomTabButton = forwardRef<View, CustomTabButtonProps>(
  ({ icon: Icon, isFocused, ...props }, ref) => {
    const color = isFocused ? 'white' : 'black';

    return (
      <Pressable
        className={`rounded-full ${isFocused ? 'bg-black' : ''} p-4 px-5`}
        ref={ref}
        {...props}
      >
        <Icon size={28} strokeWidth={1.5} color={color} />
      </Pressable>
    );
  },
);
