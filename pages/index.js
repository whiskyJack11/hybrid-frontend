import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from "axios"

export default function Home() {

  const [list, setList] = useState([]);

  useEffect(() => {
    // fetchData();
  }, []) 

  const fetchData = (event) => {
    console.log(event.target.value);
    const searchQuery = event.target.value;
    const url = `http://hn.algolia.com/api/v1/search?query=${searchQuery}`;

    axios.get(url).then(res => {
      console.log(res)
      setList(res.data.hits);
    });
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="wrap">
          <div className="search">
              <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={fetchData} />
          </div>
        </div>
        

        {
          list.map((item, index) => {
            return (
              <a href={item.objectID} className={styles['list-item']}>
                <p>{item.title}</p>
                <p>{item.author}</p>
              </a>
              
            )
          })
        }
      </main>








      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
