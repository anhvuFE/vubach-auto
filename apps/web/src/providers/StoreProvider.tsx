'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/store';
import { hydrateStore, persistStore } from '@/store/persist';

/**
 * Client Redux provider. Creates the store once (kept in a ref so it survives
 * re-renders), hydrates it from localStorage after mount, and wires persistence.
 */
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;
    hydrateStore(store);
    const unsubscribe = persistStore(store);
    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
