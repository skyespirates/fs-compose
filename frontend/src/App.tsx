import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const apiUrl = "http://localhost:3001";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetch(apiUrl)) as Response;
      const data = await response.json();
      console.log(data);
      setData(data);
      setMessage(data.message);
    };

    fetchData();
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
      {data && <p>{JSON.stringify(data)}</p>}
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

export default App;
