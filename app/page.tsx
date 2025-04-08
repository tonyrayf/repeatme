'use client'

import InfoBox from "./components/InfoBox";
import Button from "./components/Button";
import styles from "./styles/HomePage.module.css";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");

  const handleButtonClick = (name: string, image: string) => {
      setActiveInfo(activeInfo === name ? null : name); // Переключение состояния
      setActiveImage(image); // Устанавливаем изображение для инфобокса
  };
  
  return (
    <html><body className={styles.homePage}>
      <div className={styles.header}>
        <img src="logo.png" className={styles.logo} />
      </div>
      <div className={styles.buttons}>
          <Button 
              name="Расход" 
              image="flow.png" 
              onClick={() => handleButtonClick("Расход", "flow.png")} 
          />
          <Button 
              name="Фильтр" 
              image="filter.png" 
              onClick={() => handleButtonClick("Фильтр", "filter.png")} 
          />
          <Button 
              name="Давление" 
              image="press.png" 
              onClick={() => handleButtonClick("Давление", "flow.png")} 
          />
      </div>
      {activeInfo && (
          <InfoBox
              title={activeInfo} 
              image={activeImage} 
              onClose={() => setActiveInfo(null)} 
          />
      )}
    </body></html>
);
}