import { useEffect, useState } from "react";

export function useFetch(url, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("The menu could not be loaded.");
        const result = await response.json();
        setData(result.meals ?? []);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError);
          setData(fallback);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
