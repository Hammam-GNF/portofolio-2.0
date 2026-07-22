import { useCallback, useEffect, useState } from "react";
import { presenceService } from "@/services";

const usePresence = () => {
  const [activities, setActivities] = useState([]);

  const fetchPresence = useCallback(async () => {
    try {
      const data = await presenceService.getPresence();

      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch presence:", error);
    }
  }, []);

  useEffect(() => {
    fetchPresence();

    const interval = setInterval(fetchPresence,5000);

    return () => clearInterval(interval);
  }, [fetchPresence]);

  return {
    activities,
  };
};

export default usePresence;
