import { useState, useEffect, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { errorHandler, ErrorObject } from '@app/lib/axios';

export const POLLING_INTERVALS = {
  TEN_SECONDS: 1000 * 10
};

export interface useQueryProps<T> {
  fetchFn: () => Promise<AxiosResponse<T>>;
  pollingInterval?: number;
}

interface useQueryResponse<T> {
  response: T | null;
  error: ErrorObject | null;
  loading: boolean;
  refetch: () => void;
}

const useQuery = <T = any>({
  fetchFn,
  pollingInterval
}: useQueryProps<T>): useQueryResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetchFn();
      setResponse(res.data);
    } catch (err) {
      errorHandler(err, setError);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const res = await fetchFn();
      setResponse(res.data);
    } catch (err) {
      errorHandler(err, setError);
    }
  }, []);

  useEffect(() => {
    fetchData();
    let interval: NodeJS.Timer | undefined;
    if (pollingInterval) {
      interval = setInterval(refetch, pollingInterval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return { response, error, loading, refetch };
};

export default useQuery;
