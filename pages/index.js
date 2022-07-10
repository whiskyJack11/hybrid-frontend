import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import Card from "../components/card";

export default function Home() {

  const [list, setList] = useState([]);

  useEffect(() => {
    // fetchData();
  }, []) 

  const fetchData = (event) => {
    const input = event.target.value
    try {
      if (input.length == 0) {
        setList([])
      } else {
        const searchQuery = event.target.value;
        const url = `http://hn.algolia.com/api/v1/search?query=${searchQuery}`;

        axios.get(url).then(res => {
          setList(res.data.hits);
        });
      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.container}>
      <main className={`${styles.main} d-flex flex-column align-items-center`}>
        <div className="wrap">
          <div className="search">
              <input type="text" className="searchTerm p-3 border rounded" placeholder="What are you looking for?" onChange={fetchData} />
          </div>
        </div>
        

        {
          list.map((item, index) => <Card key={index} item={item}/>)
        }
      </main>
    </div>
  )
}
