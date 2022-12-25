import * as React from 'react';

type Options = {
  fetchOptions?: RequestInit;
  fetchOnMounted?: boolean;
};

type UseFetchReturn<T> = {
  response: T | null;
};

export const useFetch = <T>(
  url?: string,
  options?: Options
): UseFetchReturn<T> => {
  const [response, setResponse] = React.useState<T | null>(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async (fetchUrl: string) => {
      try {
        const res = await fetch(fetchUrl, {
          ...(options && { ...options.fetchOptions }),
          signal
        });
        const json = await res.json();
        setResponse(json);
      } catch (err) {
        console.error(err);
      }
    };
    if (url) {
      fetchData(url);
    }
    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return { response };
};
