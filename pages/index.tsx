import Head from 'next/head'
import styles from '/styles/Home.module.css'
import { useState } from 'react'
import 'reactjs-popup/dist/index.css';
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('../components/nav'))
const Favourite = dynamic(() => import('../components/favourite'))


export default function Home({ isMobileView }: { isMobileView: boolean}) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const Search = (s:string) => {
    fetch('https://api.discogs.com/database/search?&q='+s+'&type=master&key=bMdETVycfagNcpGDGtyq&secret=WsrLcgGOZerQpaDrWcLhkjLXemqmCoid',
    {
       method: 'GET',
    })
   .then(res => (res.json().then(data => {setResults(data.results.slice(0, 3));})))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Vinylist</title>
        <meta name="description" content="Welcome to Vinylist, an app for tracking your vinyl collection over time." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={styles.main}>

        <div className={styles.title}>
          <h1>Lilly</h1>
          <h3>(@r1ghtwhereyouleftm3)</h3>
        </div>

        <div className={styles.topBarContainer}>

          <button className={styles.arrow} onClick={(()=>{document.querySelector("main div div")?.scrollBy(-500, 0)})}>&larr;</button>
          
          <div className={styles.list}>
            {Array(15).fill(0).map((_, i) => (
              
              <Favourite
                Title="Taylor Swift - Lover" 
                URL="https://e-cdns-images.dzcdn.net/images/cover/6111c5ab9729c8eac47883e4e50e9cf8/250x250-000000-80-0-0.jpg"
                Key={i}
              />

            ))}
          </div>
          
          <button className={styles.arrow} onClick={(()=>{document.querySelector("main div div")?.scrollBy(500, 0)})}>&rarr;</button>
        </div>

        
        <div className={styles.grid}>
        {Array(13).fill(0).map((_, i) => (
          <div className={styles.card} key={i}>
            <picture>
              <source srcSet="https://e-cdns-images.dzcdn.net/images/cover/638ad930e4f20376e8a2851d9c41be00/250x250-000000-80-0-0.jpg"/>
              <img src="https://e-cdns-images.dzcdn.net/images/cover/638ad930e4f20376e8a2851d9c41be00/250x250-000000-80-0-0.jpg" alt="Vinyl" width={250} height={250} />
            </picture>
            <div>
              <h2>Blue Album</h2>
              <h3>Weezer</h3>
            </div>
          </div>
        ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://adrianoalasia.com/" target="_blank" rel="noopener noreferrer">
          Made by Adriano Alasia
        </a>
      </footer>

    </div>
  )
}