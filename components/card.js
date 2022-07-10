import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Card({item}) {
    return(
        <Link href={`details/[${item.objectID}].js`}>
            <a className={styles['list-item']}>
                <p>{item.title}</p>
                <p>{item.author}</p>
            </a>
        </Link>
    );
}