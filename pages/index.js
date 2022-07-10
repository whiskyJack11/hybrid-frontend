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
          list.map((item, index) => <Card key={index} item={item}/>)
        }
      </main>
    </div>
  )
}
