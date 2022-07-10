import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Card({item}) {
    return(
        <Link href={`post/${item.objectID}.js`}>
            <div className={` d-inline-block btn border p-3 mt-5 ${styles['list-item']}`}>
                <span className="d-block text-start mb-5">{item.title}</span>
                <span className="d-block text-end">{item.author}</span>
            </div>
        </Link>
    );
}