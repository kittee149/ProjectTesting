import { describe, it, expect, beforeEach } from 'vitest';
import { useComparisonStore } from './comparisonStore';
import type { ComparisonItem } from '../types';

// Helper: reset store state before each test
function resetStore() {
  useComparisonStore.setState({ items: [] });
}

const item1: ComparisonItem = { productId: 'p1', productType: 'mutual_fund' };
const item2: ComparisonItem = { productId: 'p2', productType: 'bond' };
const item3: ComparisonItem = { productId: 'p3', productType: 'deposit' };
const item4: ComparisonItem = { productId: 'p4', productType: 'ssf' };

describe('ComparisonStore', () => {
  beforeEach(() => {
    resetStore();
  });

  // ── addItem ──────────────────────────────────────────────────────────────

  it('adds up to 3 items and all return true', () => {
    const { addItem } = useComparisonStore.getState();

    expect(addItem(item1)).toBe(true);
    expect(addItem(item2)).toBe(true);
    expect(addItem(item3)).toBe(true);

    expect(useComparisonStore.getState().items).toHaveLength(3);
  });

  it('adding a 4th item returns false and list stays at 3', () => {
    const { addItem } = useComparisonStore.getState();

    addItem(item1);
    addItem(item2);
    addItem(item3);

    const result = addItem(item4);

    expect(result).toBe(false);
    expect(useComparisonStore.getState().items).toHaveLength(3);
  });

  it('adding a duplicate productId returns false and list is unchanged', () => {
    const { addItem } = useComparisonStore.getState();

    addItem(item1);
    addItem(item2);

    const result = addItem({ productId: 'p1', productType: 'bond' }); // same id, different type

    expect(result).toBe(false);
    expect(useComparisonStore.getState().items).toHaveLength(2);
  });

  // ── removeItem ───────────────────────────────────────────────────────────

  it('removeItem removes the correct item and leaves others unchanged', () => {
    const { addItem, removeItem } = useComparisonStore.getState();

    addItem(item1);
    addItem(item2);
    addItem(item3);

    removeItem('p2');

    const { items } = useComparisonStore.getState();
    expect(items).toHaveLength(2);
    expect(items.find((i) => i.productId === 'p2')).toBeUndefined();
    expect(items.find((i) => i.productId === 'p1')).toBeDefined();
    expect(items.find((i) => i.productId === 'p3')).toBeDefined();
  });

  it('removeItem on a non-existent productId leaves the list unchanged', () => {
    const { addItem, removeItem } = useComparisonStore.getState();

    addItem(item1);
    addItem(item2);

    removeItem('does-not-exist');

    expect(useComparisonStore.getState().items).toHaveLength(2);
  });

  // ── clearAll ─────────────────────────────────────────────────────────────

  it('clearAll empties the list', () => {
    const { addItem, clearAll } = useComparisonStore.getState();

    addItem(item1);
    addItem(item2);
    addItem(item3);

    clearAll();

    expect(useComparisonStore.getState().items).toHaveLength(0);
  });

  it('clearAll on an already-empty list leaves it empty', () => {
    const { clearAll } = useComparisonStore.getState();

    clearAll();

    expect(useComparisonStore.getState().items).toHaveLength(0);
  });
});
