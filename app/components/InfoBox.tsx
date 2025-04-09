import styles from "../styles/InfoBox.module.css";
import localFont from 'next/font/local';

const Font = localFont({ src: "../fonts/Martian-Mono.ttf" });

interface InfoBoxProps {
    param: string | null;
    value: string;
    measure: string;
    stateMsg: string;
    onClose: () => void;
}

export default function InfoBox({ param, value, measure, stateMsg, onClose }: InfoBoxProps) {
    return (
        <div className={styles.infoBox}>
            <p className={Font.className}>{param}: {value}{' '}{measure}<br/>Состояние: {stateMsg}</p>
            <button className={Font.className} onClick={onClose}>Закрыть</button>
        </div>
    );
}