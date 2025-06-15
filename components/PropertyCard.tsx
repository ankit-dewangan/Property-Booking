import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Property } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="relative mb-3 overflow-hidden rounded-[2.5rem] shadow-lg"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={{ uri: property.images[0] }}
        className="h-64 w-full"
      >
        <LinearGradient
          className="flex flex-1 justify-end p-5"
          colors={['transparent', 'rgba(0,0,0,0.8)']}
        >
          <Text className="text-lg font-semibold text-white" numberOfLines={1}>
            {property.title}
          </Text>
          <View className="mt-1.5 flex-row items-center">
            <MapPin size={14} color="#8E8E93" strokeWidth={2} />
            <Text className="ml-2 text-sm text-white">
              {property.location.city}, {property.location.state}
            </Text>
          </View>
          <View className="mt-1.5 flex-row justify-between">
            <Text className="text-sm text-white">${property.price}/month</Text>
            <Text className="text-sm text-white">
              {property.features.slice(0, 2).join(' • ')}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
