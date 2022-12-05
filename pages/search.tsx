import Head from 'next/head'
import styles from '/styles/Home.module.css'
import { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import dynamic from 'next/dynamic';

const Nav = dynamic(() => import('../components/nav'));

export default function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const Search = (s:string) => {
         fetch('https://api.discogs.com/database/search?&q='+s+'&type=master&key=bMdETVycfagNcpGDGtyq&secret=WsrLcgGOZerQpaDrWcLhkjLXemqmCoid',
         {
            method: 'GET',
         })
        .then(res => (res.json().then(data => {setResults(data.results); console.log(data.results); data.results.map((result:any) => {console.log(result.cover_image);})})))
    }



    return (
        <div className={styles.container}>
            <Head>
                <title>Vinylist</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Welcome to Vinylist, an app for tracking your vinyl collection over time." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <main className={styles.main}>
                <div className={styles.title}><h1>Search</h1></div>
                <div className={styles.search}>
                    <input type="text" className={styles.searchBar} onChange={(e)=>{setSearch(e.target.value)}}/>
                    <button className={styles.searchButton} onClick={() => Search(search)}>Search</button>
                </div>
                <div className={styles.results}>
                    {results.map((result: any, i) => (
                        <Popup key={i} trigger={
                            <div className={styles.result}>
                                <div className={styles.result_image}>
                                    <picture>
                                        <source srcSet={result.cover_image} type="image/jpeg" />
                                        <img alt={result.title} src={result.cover_image} width={100} height={100} />
                                    </picture>
                                </div>
                                <div className={styles.result_info}>
                                    <h3>{result.title}</h3>
                                    <p>{result.year}</p>
                                </div>
                            </div>
                        } position="top center">
                            <div className={styles.modal}>
                                <p>Options</p>
                                <div className={styles.modal_buttons}>
                                    <p><a onClick={()=>{

                                    }} className={styles.modal_button}>Add to owned vinyls</a></p>
                                    <p><a onClick={()=>{

                                    }} className={styles.modal_button}>Add to wishlist</a></p>
                                </div>

                            </div>
                        </Popup>
                    ))}
                </div>

            </main>
        </div>
    )
}