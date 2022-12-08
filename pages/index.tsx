import Head from 'next/head'
import styles from '/styles/Home.module.css'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '../contexts/authContext'
import { collection, getDoc, doc, arrayRemove } from "firebase/firestore"; 
import { db } from '../config/firebase'


const Nav = dynamic(() => import('../components/nav'))
const Favourite = dynamic(() => import('../components/favourite'))
const Card = dynamic(() => import('../components/card'))

const scroll_r = () => {document.querySelector(`.${styles.list}`)?.scrollBy(500, 0);}
const scroll_l = () => {document.querySelector(`.${styles.list}`)?.scrollBy(-500, 0);}

export default function Home() {

  const [favourites, setFavourites] = useState<Array<any>>([]);
  const [vinyls, setVinyls] = useState<Array<any>>([]);
  const {user} = useAuth();
  const [name, setName] = useState('');

  const UsersRef = collection(db, "Users");

  useEffect(()=>{
    getDoc(doc(UsersRef, user.uid)).then ((doc) => {
        console.log(doc.data());
        setName(doc.data()?.Name);
        setVinyls(Array.from(doc.data()?.Vinyls).filter((vinyl: any) => vinyl.Favourite === false));
        setFavourites(Array.from(doc.data()?.Vinyls).filter((vinyl: any) => vinyl.Favourite === true));
    })
  }, [])

  return (
    <div className={styles.container}>
      
      {/* HEAD */}

      <Head>
        <title>Vinylist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" /> 
        <meta name="description" content="Welcome to Vinylist, an app for tracking your vinyl collection over time." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav user={user}/> {/* Navigation bar */}

      <main className={styles.main}>

        {/* TITLE */}

        <div className={styles.username}>
          <h1>{name}</h1>
          <h3>(@{user.displayName})</h3>
        </div>

        {/* MAIN CONTENT */}
        {/* FAVOURITES SECTION */}
        {favourites.length === 0 && vinyls.length === 0 ? (<div className={styles.nothing}><h1>No Vinyls</h1></div>) : (
          <>
          <div className={styles.topBarContainer}>
            
            
            
            {favourites.length === 0 ? (<div className={styles.nothing}><h1>No Favourites</h1></div>) : (
            <>
              <button className={styles.arrow} onClick={scroll_l}>
                &larr;
              </button>
              <div className={styles.list}>

                  {favourites.map((v, i) => (
                    
                    <Favourite
                      Title={v.Title}
                      URL={v.Img}
                      Key={i}
                      Id={v.Id}
                      Callback={(obj: any) => {
                        setFavourites(favourites.filter((vinyl: any) => vinyl.Title !== obj.Title));
                        setVinyls([...vinyls, obj]);
                      }}
                    />

                  ))}

              </div>
              <button className={styles.arrow} onClick={scroll_r}>
                &rarr;
              </button>
            </>
            )}
          
          </div>

          {/* ALL SECTION */}
          
          <div className={styles.grid}>
          {vinyls.map((v, i) => (
            <Card 
              Title={v.Title}
              URL={v.Img}
              Key={i}
              Id={v.Id}
              UID={"-1"}
              Callback={(obj: any, action:string) => {
                if (action === "remove") {
                  setFavourites(favourites.filter((vinyl: any) => vinyl.Title !== obj.Title));
                  setVinyls(vinyls.filter((vinyl: any) => vinyl.Title !== obj.Title));
                }
                else if (action === "add") {
                  setFavourites([...favourites, obj]);
                  setVinyls(vinyls.filter((vinyl: any) => vinyl.Title !== obj.Title));
                }
              }}
            />
          ))}
          </div>
        </>
        )}
      </main>

      {/* FOOTER */}

      <footer className={styles.footer}>
        <a href="https://github.com/AdrianoAla" target="_blank" rel="noopener noreferrer">
          Made by Adriano Alasia
        </a>
      </footer>

    </div>
  )
}