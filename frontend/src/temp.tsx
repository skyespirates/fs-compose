import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import List from './components/List';

const service_1 = 'http://localhost:3001';
const service_2 = 'http://localhost:3002';

export function Temp() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [datax, setDatax] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(service_1);
      const data = await response.json();

      setData(data.existingTasks);
      setMessage('Hello Skyes!');
    };

    const getData = async () => {
      const resp = await fetch(service_2);
      const dt = await resp.json();
      setDatax(dt.existingTasks);
    };

    fetchData();
    getData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {message && <h1>{message}</h1>}
      <h1>Service 1</h1>
      {data && <List data={data} />}

      <br />
      <br />
      <br />
      <h1>Service 2</h1>
      {datax && <List data={datax} />}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
