'use client'

import Button from "./components/Button";
import styles from "./styles/HomePage.module.css";
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const runPythonScript = async () => {
          const response = await fetch('/api/run_python');
          const result = await response.json();
          setData(result.output);
          //setLoading(false);
      };

      runPythonScript();
  }, []);

  var flow_rate = 0;
  var pressure = 0;
  if (data != null) {
    var result = JSON.parse(data.split('\n')[1]);

    flow_rate = result.flow_rate;
    pressure = result.pressure;
  }

  return (
    <html>
      <body className={styles.HomePage}>
        <Button name="" image="flow.png"/>
        <Button name="" image="filter.png"/>
        <Button name="" image="press.png"/>

        {flow_rate} {" "}
        {pressure}

      </body>
    </html>
  );
}