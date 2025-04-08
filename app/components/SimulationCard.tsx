import styles from '../styles/SimulationCard.module.css';
import Link from 'next/link';

interface SimulationCardProps
{
    name : string;
    image : string;
    url : string;
}

export default function SimulationCard({name, image, url} : SimulationCardProps)
{
    return (
        <Link href={url} className={styles.card}>
            <img src={image} />
            {name}
        </Link>
    );
}