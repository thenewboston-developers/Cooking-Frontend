import React, {useEffect, useState} from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [requestPending, setRequestPending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true)
        const response = await fetch(`http://127.0.0.1:8000/api/accounts`);

        if (response.ok) {
          const _data = await response.json();
          setData(_data);
        } else {
          setData(null);
        }
      } finally {
        setRequestPending(false)
      }
    })();
  }, []);

  return (
    <div>
      Corn
    </div>
  );
};

export default App;
