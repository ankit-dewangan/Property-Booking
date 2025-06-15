import { create } from 'zustand';
import { Property } from '@/types';

interface PropertyStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),
}));