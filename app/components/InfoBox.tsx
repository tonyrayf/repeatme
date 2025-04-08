import styles from "../styles/InfoBox.module.css";

interface InfoBoxProps {
    title: string;
    image: string;
    onClose: () => void;
}

export default function InfoBox({ title, image, onClose } : InfoBoxProps) {
    return (
        <div className={styles.infoBox}>
            <p>Информация о {title}</p>
            <p>Это изображение: {image}</p>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};