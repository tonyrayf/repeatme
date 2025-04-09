import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header()
{
    return (
        <div className={styles.header}>
            <Link href="/" className={styles.logoLink}>
                <img src="logo.png" className={styles.logo} alt="Логотип" />
            </Link>

            <img src="user.png" className={styles.user} alt="Логотип" />
        </div>
    );
}