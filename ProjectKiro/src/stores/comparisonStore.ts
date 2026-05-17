import { create } from 'zustand';
import type { ComparisonItem } from '../types';

/**
 * ComparisonStore — manages the product comparison list.
 *
 * Rules (Requirements 7.1, 7.3, 7.4):
 *  - Maximum 3 items at any time.
 *  - addItem returns false (and does NOT mutate state) when:
 *      • the list already has 3 items, OR
 *      • an item with the same productId already exists.
 *  - removeItem filters out the item with the given productId.
 *  - clearAll resets the list to [].
 */

interface ComparisonStore {
  items: ComparisonItem[];
  addItem: (item: ComparisonItem) => boolean;
  removeItem: (productId: string) => void;
  clearAll: () => void;
}

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  items: [],

  addItem: (item: ComparisonItem): boolean => {
    const { items } = get();

    // Reject if already at capacity
    if (items.length >= 3) {
      return false;
    }

    // Reject duplicates
    if (items.some((existing) => existing.productId === item.productId)) {
      return false;
    }

    set({ items: [...items, item] });
    return true;
  },

  removeItem: (productId: string): void => {
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },

  clearAll: (): void => {
    set({ items: [] });
  },
}));
