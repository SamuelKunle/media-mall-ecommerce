import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "mediamall-recently-viewed";
const MAX_ITEMS = 10;

export const useRecentlyViewed = (currentProductId?: number) => {
  const [viewedIds, setViewedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track current product view
  useEffect(() => {
    if (!currentProductId) return;
    setViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== currentProductId);
      const updated = [currentProductId, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [currentProductId]);

  // Return IDs excluding current product
  const getRecentIds = useCallback(
    () => viewedIds.filter((id) => id !== currentProductId),
    [viewedIds, currentProductId]
  );

  return { recentIds: getRecentIds() };
};
