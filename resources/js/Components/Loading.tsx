import { useState, useEffect } from 'react';
import axios from 'axios';

const Loading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-10">
          <div className="flex space-x-4">
            <div className="spinner-grow text-blue-500 w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <div className="spinner-grow text-green-500 w-8 h-8 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            <div className="spinner-grow text-red-500 w-8 h-8 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;