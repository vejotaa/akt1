import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("https://akt1-api.onrender.com/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div>
      <h1>dia: {data.dia}</h1>
      <h1>mes: {data.mes}</h1>
    </div>
  );
}

export default App;
