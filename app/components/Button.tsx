import styles from "../styles/Button.module.css";
import localFont from 'next/font/local';

const Font = localFont({src: "../fonts/Martian-Mono.ttf"})

interface Props {
    name: string;
    image: string;
    onClick: () => void;
}

export default function Button({ name, image, onClick }: Props) {
    return (
        <div className={`${styles.button} ${Font.className}`} onClick={onClick}>
            <img src={image} className={styles.img} alt={name} />
            <br />
            {name}
        </div>
    );
}