import styles from "../styles/Button.module.css";
import Link from "next/link";

interface props
{
    name : string,
    image : string
}

export default function Button({name, image} : props)
{
    return (
    <div className={styles.button}>
        <img src={image} className={styles.img} />
        {name}
    </div>
    );
}