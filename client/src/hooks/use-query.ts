import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { errorHandler, ErrorObject } from '@app/lib/axios';

interface useQueryProps<T> {
  fetchFn: () => Promise<AxiosResponse<T>>;
}

interface useQueryResponse<T> {
  response: T | null;
  error: ErrorObject | null;
  loading: boolean;
  refetch: () => void;
}

const useQuery = <T = any>({
  fetchFn
}: useQueryProps<T>): useQueryResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await fetchFn();
      setResponse(res.data);
    } catch (err) {
      errorHandler(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    try {
      const res = await fetchFn();
      setResponse(res.data);
    } catch (err) {
      errorHandler(err, setError);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading, refetch };
};

export default useQuery;
