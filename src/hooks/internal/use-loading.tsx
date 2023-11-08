import { useState } from "react";

export function useLoading() {
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
  };
}
