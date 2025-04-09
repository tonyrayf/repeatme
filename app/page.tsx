"use client";

import InfoBox from "./components/InfoBox";
import Button from "./components/Button";
import styles from "./styles/HomePage.module.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import ThickLine from "./components/ThickLine";


const goodPressure = 5000;
const badPressure = 10000;
const goodFlowrate = 242.519;
const badFlowrate = goodFlowrate * 0.95;


export default function HomePage() {
  // Переменные
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [info, setInfo] = useState<{ param: string | null; value: string; measure: string; stateMsg: string}>({
    param: null,
    value: '-',
    measure: '',
    stateMsg: '-'
  });
  const [data, setData] = useState<{ flowRate: string; pressure: string; resistance: string}>({
    flowRate: '',
    pressure: '',
    resistance: ''
  });


  // Получение данных
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

    // Вызов для получения данных
    fetchData();

    // Устанавливаем интервал для обновления данных каждые 5 секунд
    const intervalId = setInterval(fetchData, 5000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [isRunning]);

  
  // Нажатие на кнопку
  const handleButtonClick = (name: string) => {
    let val = '-';
    let measure = '';
    let stateMsg = '-';
    let relativeValue = 0;

    if (data.flowRate) switch (name) {
      case "Расход": {
        measure = "кг/c";
        
        val = data.flowRate;

        relativeValue = ((goodFlowrate / Number(val)) - 1) * 100  //Относительных расход

        if (relativeValue <= 0.25) {
            stateMsg = "В норме";
        } else if (relativeValue < 5) {
            stateMsg = `Понижено на ${relativeValue}%`;
        } else {
            stateMsg = `Критически понижено на ${relativeValue}%`;
        }
        break;
      }
      case "Давление": {
        measure = "Па";

        val = data.pressure;

        relativeValue = ((Number(val) / goodPressure) - 1) * 100  //Относительное давление

        if (relativeValue <= 5) {
            stateMsg = "В норме";
        } else if (relativeValue < 100) {
            stateMsg = `Превышено на ${relativeValue}%`;
        } else {
            stateMsg = `Критически превышено на ${relativeValue}%`;
        }
        break;
      }
      case "Фильтр": {
        val = data.resistance;
        
        if (Number(val) <= 41.1) {
          stateMsg = "Исправное";
        }
        else if (Number(val) < 78.3) {
          stateMsg = "Загрязнённое";
        }
        else if (Number(val) < 2139.8) {
          stateMsg = "Превышено допустимое давление";
        }
        else {
          stateMsg = "Неисправное";
        }
        break;
      }
    }

    setInfo({ param: name, value: val, measure : measure, stateMsg: stateMsg });
  };


  // Активация/деактивация
  const toggleRunning = async () => {
    setIsRunning(prev => !prev);
    alert(isRunning ? "Расчёт модели остановлен." : "Расчёт модели запущен.");
  };

  // Вывод
  return (
    <html>
      <body className={styles.homePage}>
        <Header />
        <div className={styles.buttons}>
        <ThickLine />
          <Button 
            name="Расход" 
            image="flow.png" 
            onClick={() => handleButtonClick("Расход")} 
          />
          <Button 
            name="Фильтр" 
            image="filter.png" 
            onClick={() => handleButtonClick("Фильтр")} 
          />
          <Button 
            name="Давление" 
            image="press.png" 
            onClick={() => handleButtonClick("Давление")} 
          />
        </div>
        
        <button 
          className={`${styles.activateButton} ${isRunning ? styles.running : styles.stopped}`} 
          onClick={toggleRunning}
        >
          {isRunning ? "Остановить" : "Запустить"}
        </button>

        {info.param && (
          <InfoBox
            param = {info.param}
            value = {info.value}
            measure = {info.measure}
            stateMsg = {info.stateMsg}
            
            onClose={() => {
              setInfo({ param: null, value: '-', measure: '', stateMsg: '-' });
            }}
          />
        )}
      </body>
    </html>
  );
}