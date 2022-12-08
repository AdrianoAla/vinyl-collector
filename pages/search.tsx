import Head from 'next/head'
import styles from '/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import dynamic from 'next/dynamic';
import { useAuth } from '../contexts/authContext';
import { doc, collection, arrayUnion, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { db } from '../config/firebase';

const Nav = dynamic(() => import('../components/nav'));

export default function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [lastSearchTime, setLastSearchTime] = useState(0);
    const {user} = useAuth()
    const UsersRef = collection(db, "Users");

    const [vinyls, setVinyls] = useState<Array<any>>([]);

    useEffect(() => {
        getDoc(doc(UsersRef, user.uid)).then ((doc) => {
            setVinyls(doc.data()?.Vinyls.map((vinyl:any) => vinyl.Id));
        })
    }, [])

    const Search = (s:string) => {

        // Avoiding rate limiting and user spam
        
        if (s.length === 0) return;
        if (Date.now() - lastSearchTime < 1500) return;
        if (searching) return;

        setResults([]);
        setSearching(true);
        fetch('https://api.discogs.com/database/search?&q='+s+'&type=master&key=bMdETVycfagNcpGDGtyq&secret=WsrLcgGOZerQpaDrWcLhkjLXemqmCoid',
        {
            method: 'GET',
        })
        .then(res => (
            res.json().then(data => {
                setResults(data.results.slice(0,5));
                setSearching(false);
                setLastSearchTime(Date.now());
            })
        ))
        .catch(err => console.log(err));

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Vinylist</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Welcome to Vinylist, an app for tracking your vinyl collection over time." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav user={user}/>

            <main className={styles.main}>
                <div className={styles.search}>
                    <div className={styles.searchTitle}><h1>Search</h1></div>
                    <div className={styles.searchInputs}>
                        <input type="text" className={styles.searchBar} onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={(e)=>{if (e.key === 'Enter') Search(search)}}/>
                        <button className={styles.searchButton} onClick={() => Search(search)}>Search</button>
                    </div>
                </div>
                {searching ? <div className={styles.searching}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="160px" height="160px"><path fill="#455a64" d="M38.141,9.856c-7.808-7.808-20.473-7.808-28.281,0c-7.813,7.812-7.813,20.476,0,28.285c7.808,7.812,20.473,7.812,28.281,0C45.953,30.332,45.953,17.668,38.141,9.856z"/><path fill="#90a4ae" d="M9.855 38.14c1.184 1.184 2.492 2.167 3.865 2.993l9.198-15.333c-.144-.086-.284-.185-.407-.312-.127-.123-.226-.263-.313-.407L6.866 34.279C7.692 35.653 8.675 36.96 9.855 38.14zM38.141 9.856c-1.18-1.18-2.488-2.163-3.861-2.989l-9.198 15.333c.144.086.284.185.407.312.127.123.226.263.313.407l15.333-9.198C40.308 12.347 39.325 11.04 38.141 9.856z"/><path fill="#263238" d="M30.366,17.634c-3.51-3.51-9.223-3.51-12.733,0c-3.513,3.51-3.513,9.223,0,12.733c3.51,3.513,9.223,3.513,12.733,0C33.876,26.857,33.876,21.143,30.366,17.634z"/><path fill="#ffc107" d="M28.949,19.051c-2.734-2.734-7.164-2.734-9.898,0s-2.734,7.164,0,9.898s7.164,2.734,9.898,0S31.684,21.785,28.949,19.051z M22.586,25.414c-0.781-0.781-0.781-2.047,0-2.828s2.047-0.781,2.828,0s0.781,2.047,0,2.828S23.367,26.195,22.586,25.414z"/></svg>
                </div> : <div className={styles.searching}></div>}
                
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
                        } position="top center" >
                            <div className={styles.modal}>
                                <div className={styles.modal_buttons}>
                                {!(vinyls.includes(result.id)) ? (
                                    <>
                                        <p>{result.title}</p>
                                        <p><a onClick={()=>{
                                            console.log(result);
                                            updateDoc(doc(UsersRef, user.uid), {
                                                Vinyls: arrayUnion({Title: result.title, Img: result.cover_image, Id: result.id, Favourite: false}),
                                            })                        
                                            setVinyls([...vinyls, result.id]);
                                        }} className={styles.modal_button}>Add to owned vinyls</a></p>
                                        <p><a onClick={()=>{
                                            updateDoc(doc(UsersRef, user.uid), {
                                                Vinyls: arrayUnion({Title: result.title, Img: result.cover_image, Id: result.id, Favourite: true}),
                                            })
                                            setVinyls([...vinyls, result.id]);
                                        }} className={styles.modal_button}>Add to favourites</a></p>
                                    </>
                                ) : (
                                    <>
                                        <p>{result.title}</p>
                                        <p>Already in collection</p>
                                    </>
                                )}
                                </div>

                            </div>
                        </Popup>
                    ))}
                </div>

            </main>
        </div>
    )
}