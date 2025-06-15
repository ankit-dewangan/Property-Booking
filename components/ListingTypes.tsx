import { View, Text } from 'react-native';
import React from 'react';

export default function ListingTypes({ searchQuery }: { searchQuery: string }) {
  return (
    <View className="mb-3 flex flex-row gap-2">
      <View className="self-start rounded-full border border-black bg-black p-3 px-4">
        <Text className="text-white">
          {searchQuery ? 'Search' : 'Featured'}
        </Text>
      </View>
      <View className="self-start rounded-full border border-neutral-300 p-3 px-4">
        <Text className="text-black">Buy</Text>
      </View>
      <View className="self-start rounded-full border border-neutral-300 p-3 px-4">
        <Text className="text-black">Rent</Text>
      </View>
    </View>
  );
}
