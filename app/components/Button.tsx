import styles from "../styles/Button.module.css";

interface Props {
    name: string;
    image: string;
    onClick: () => void;
}

export default function Button({ name, image, onClick }: Props) {
    return (
        <div className={styles.button} onClick={onClick}>
            <img src={image} className={styles.img} alt={name} />
            <br />
            {name}
        </div>
    );
}