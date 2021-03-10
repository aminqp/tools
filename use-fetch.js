import { useState } from 'react';

const useFetch = (fetch) => {
  const [load, setLoad] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState(false);

  const call = (...args) => new Promise((resolve, reject) => {
    setLoading(true);

    const rejectApi = (error) => {
      setData(error?.response?.data);
      setResponse(error?.response);
      setLoad('failure');
      setLoading(false);
      setLoaded(false);
      reject(error);
    };

    try {
      fetch(...args)
        .then((res) => {
          setData(res.data);
          setResponse(res);
          setLoad('success');
          setLoading(false);
          setLoaded(true);
          resolve(res);
        })
        .catch((error) => {
          rejectApi(error);
        });
    } catch (error) {
      rejectApi(error);
    }
  });

  return ({
    call,
    data,
    load,
    loaded,
    loading,
    response
  });
};

export default useFetch;
