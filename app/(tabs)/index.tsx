import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PropertyCard } from '@/components/PropertyCard';
import { SearchBar } from '@/components/SearchBar';
import { useProperties, useSearchProperties } from '@/hooks/useProperties';
import { usePropertyStore } from '@/stores/usePropertyStore';
import { MapPin } from 'lucide-react-native';
import ListingTypes from '@/components/ListingTypes';

export default function HomeScreen() {
  const router = useRouter();
  const { searchQuery, setSearchQuery, setSelectedProperty } =
    usePropertyStore();

  const { data: properties, isLoading, refetch } = useProperties();
  const { data: searchResults } = useSearchProperties(searchQuery);

  const displayProperties = searchQuery ? searchResults : properties;

  const handlePropertyPress = (property: any) => {
    setSelectedProperty(property);
    router.push(`/property/${property.id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FF]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-20 gap-5"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <View className="mt-12 w-[80%]">
          <Text className="text-start text-3xl font-semibold">
            Find Your favourite Home in
          </Text>
          <View className="absolute -bottom-2 left-[40%] flex flex-row items-center justify-center gap-2 rounded-full bg-black p-3 pl-3 pr-4">
            <MapPin size={20} color="#F8F9FF" strokeWidth={1} />
            <Text className="text-white">Canada</Text>
          </View>
        </View>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by city, state, or features..."
        />
        <View>
          <ListingTypes searchQuery={searchQuery} />
          {displayProperties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property)}
            />
          ))}

          {displayProperties?.length === 0 && searchQuery && (
            <View>
              <Text>No properties found for "{searchQuery}"</Text>
              <Text>Try searching for a different location or features</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
