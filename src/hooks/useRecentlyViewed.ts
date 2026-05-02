import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "mediamall-recently-viewed";
const MAX_ITEMS = 10;

export const useRecentlyViewed = (currentProductId?: number) => {
  /** Must match SSR + first client paint; read localStorage only in useEffect to avoid hydration mismatch. */
  const [viewedIds, setViewedIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      let ids: number[] = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(ids)) ids = [];
      if (currentProductId != null) {
        const filtered = ids.filter((id) => id !== currentProductId);
        ids = [currentProductId, ...filtered].slice(0, MAX_ITEMS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      }
      setViewedIds(ids);
    } catch {
      setViewedIds([]);
    }
  }, [currentProductId]);

  // Return IDs excluding current product
  const getRecentIds = useCallback(
    () => viewedIds.filter((id) => id !== currentProductId),
    [viewedIds, currentProductId]
  );

  return { recentIds: getRecentIds() };
};
