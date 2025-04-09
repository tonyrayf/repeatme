"use client";

import InfoBox from "./components/InfoBox";
import Button from "./components/Button";
import styles from "./styles/HomePage.module.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import ThickLine from "./components/ThickLine";
import AreaChartComponent from "./components/AreaChartComponent";


const goodPressure = 5000;
const badPressure = 10000;
const goodFlowrate = 242.519;
const badFlowrate = goodFlowrate * 0.95;
const maxPoints = 8;


export default function HomePage() {
  // Переменные
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [info, setInfo] = useState<{ param: string | null; value: string; measure: string; stateMsg: string }>({
    param: null,
    value: '-',
    measure: '',
    stateMsg: '-'
  });
  const [data, setData] = useState<{ flowRate: string; pressure: string; resistance: string }>({
    flowRate: '',
    pressure: '',
    resistance: ''
  });
  
  // Состояния для графиков
  const [flowRateChartData, setFlowRateChartData] = useState<{ timestamp: string; value: number }[]>([]);
  const [pressureChartData, setPressureChartData] = useState<{ timestamp: string; value: number }[]>([]);
  const [resistanceChartData, setResistanceChartData] = useState<{ timestamp: string; value: number }[]>([]);
  
  const [activeChart, setActiveChart] = useState<string | null>(null); // Состояние для активного графика


  // Запуск скрипта пайтон
  useEffect(() => {
    const fetchData = async () => {
      if (isRunning) {
        const response = await fetch('/api/run_python');
        const result = await response.json();
        const outputData = result.output;

        if (outputData) {
          const parsedData = JSON.parse(outputData.split('\n')[1]);
          setData({
            flowRate: parsedData.flowRate.toString(),
            pressure: parsedData.pressure.toString(),
            resistance: parsedData.resistance.toString()
          });
        }
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [isRunning]);


  // Нажатие по кнопке параметра
  const handleButtonClick = (name: string) => {
    let val = '-';
    let measure = '';
    let value = 0;
    let stateMsg = '-';
    let relativeValue = 0;

    if (data.flowRate) {
      switch (name) {
        case "Расход": {
          measure = "кг/c";

          val = data.flowRate;
          value = Number(val);
          
          relativeValue = ((goodFlowrate / value) - 1) * 100  //Относительный расход

          if (relativeValue <= 5) {
              stateMsg = "В норме";
          } else if (relativeValue < 100) {
              stateMsg = `Превышено на ${relativeValue}%`;
          } else {
              stateMsg = `Критически превышено на ${relativeValue}%`;
          }


          setFlowRateChartData(prev => {
            const newData = [...prev, { timestamp: new Date().toLocaleTimeString(), value }];
            return newData.length > maxPoints ? newData.slice(newData.length - maxPoints) : newData;
          });
          setActiveChart("flowRate");
          break;
        }
        case "Давление": {
          measure = "Па";

          val = data.pressure;
          value = Number(val);

          relativeValue = ((value / goodPressure) - 1) * 100  //Относительное давление

          if (relativeValue <= 5) {
              stateMsg = "В норме";
          } else if (relativeValue < 100) {
              stateMsg = `Превышено на ${relativeValue}%`;
          } else {
              stateMsg = `Критически превышено на ${relativeValue}%`;
          }


          setPressureChartData(prev => {
            const newData = [...prev, { timestamp: new Date().toLocaleTimeString(), value }];
            return newData.length > maxPoints ? newData.slice(newData.length - maxPoints) : newData;
          });
          setActiveChart("pressure");
          break;
        }
        case "Фильтр": {
          val = data.resistance;

          value = Number(val);

          
        if (value <= 41.1) {
          stateMsg = "Исправное";
        }
        else if (value < 78.3) {
          stateMsg = "Загрязнённое";
        }
        else if (value < 2139.8) {
          stateMsg = "Превышено допустимое давление";
        }
        else {
          stateMsg = "Неисправное";
        }

          setResistanceChartData(prev => {
            const newData = [...prev, { timestamp: new Date().toLocaleTimeString(), value }];
            return newData.length > maxPoints ? newData.slice(newData.length - maxPoints) : newData;
          });
          setActiveChart("resistance");
          break;
        }
      }
    }

    setInfo({ param: name, value: val, measure: measure, stateMsg: stateMsg });
  };


  // Переключатель
  const toggleRunning = async () => {
    setIsRunning(prev => !prev);
    alert(isRunning ? "Расчёт модели остановлен." : "Расчёт модели запущен.");
  };


  return (
    <html>
      <body className={styles.homePage}>
        <Header />
        <div className={styles.buttons}>
          <ThickLine />
          <Button name="Расход" image="flow.png" onClick={() => handleButtonClick("Расход")} />
          <Button name="Фильтр" image="filter.png" onClick={() => handleButtonClick("Фильтр")} />
          <Button name="Давление" image="press.png" onClick={() => handleButtonClick("Давление")} />
        </div>

        <button
          className={`${styles.activateButton} ${isRunning ? styles.running : styles.stopped}`}
          onClick={toggleRunning}
        >
          {isRunning ? "Остановить" : "Запустить"}
        </button>

        {info.param && (
          <InfoBox
            param={info.param}
            value={info.value}
            measure={info.measure}
            stateMsg={info.stateMsg}
            onClose={() => {
              setInfo({ param: null, value: '-', measure: '', stateMsg: '-' });
            }}
          />
        )}

        <div className={styles.chartContainer}>
          {activeChart === "flowRate" && (
            <AreaChartComponent data={flowRateChartData} title="Расход" />
          )}
          {activeChart === "pressure" && (
            <AreaChartComponent data={pressureChartData} title="Давление" />
          )}
          {activeChart === "resistance" && (
            <AreaChartComponent data={resistanceChartData} title="Фильтр" />
          )}
        </div>
      </body>
    </html>
  );
}