import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>dia: {data.dia}</h1>
      <h1>mes: {data.mes}</h1>
    </div>
  );
}

export default App;
