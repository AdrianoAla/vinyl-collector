import Head from 'next/head'
import Image from 'next/image'
import styles from '/styles/Home.module.css'

// export async function getServerSideProps() {

// }

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vinylist</title>
        <meta name="description" content="Welcome to Vinylist, an app for tracking your vinyl collection over time." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="60px" height="60px"><path fill="#455a64" d="M38.141,9.856c-7.808-7.808-20.473-7.808-28.281,0c-7.813,7.812-7.813,20.476,0,28.285c7.808,7.812,20.473,7.812,28.281,0C45.953,30.332,45.953,17.668,38.141,9.856z"/><path fill="#90a4ae" d="M9.855 38.14c1.184 1.184 2.492 2.167 3.865 2.993l9.198-15.333c-.144-.086-.284-.185-.407-.312-.127-.123-.226-.263-.313-.407L6.866 34.279C7.692 35.653 8.675 36.96 9.855 38.14zM38.141 9.856c-1.18-1.18-2.488-2.163-3.861-2.989l-9.198 15.333c.144.086.284.185.407.312.127.123.226.263.313.407l15.333-9.198C40.308 12.347 39.325 11.04 38.141 9.856z"/><path fill="#263238" d="M30.366,17.634c-3.51-3.51-9.223-3.51-12.733,0c-3.513,3.51-3.513,9.223,0,12.733c3.51,3.513,9.223,3.513,12.733,0C33.876,26.857,33.876,21.143,30.366,17.634z"/><path fill="#ffc107" d="M28.949,19.051c-2.734-2.734-7.164-2.734-9.898,0s-2.734,7.164,0,9.898s7.164,2.734,9.898,0S31.684,21.785,28.949,19.051z M22.586,25.414c-0.781-0.781-0.781-2.047,0-2.828s2.047-0.781,2.828,0s0.781,2.047,0,2.828S23.367,26.195,22.586,25.414z"/></svg>
          <h3>Vinylist</h3>
        </div>
          <ul>
            <li>
              <a href="/vinyls">Vinyls</a>
            </li>
            <li>
              <a href="/vinyls/new">Add Vinyl</a>
            </li>
            <li>
              <a href="/users/me">Profile</a>
            </li>
            <li>
              <a href="/logout">Log Out</a>
            </li>
          </ul>

        </nav>

      <main className={styles.main}>
        
       
        <div className={styles.title}>
          <h1>Lilly</h1>
          <h3>(@r1ghtwhereyouleftm3)</h3>
        </div>

        <div className={styles.topBarContainer}>
          <button className={styles.arrow} onClick={(()=>{document.querySelector("main div div")?.scrollBy(-500, 0)})}>&larr;</button>
          <div className={styles.list}>
            {Array(15).fill(0).map((_, i) => (
            <div className={styles.vinyl} key={i}>
              <a href="https://google.com/">
                <Image src="https://e-cdns-images.dzcdn.net/images/cover/6111c5ab9729c8eac47883e4e50e9cf8/250x250-000000-80-0-0.jpg" alt="Vinyl" width={120} height={120} />
                Taylor Swift - Lover
              </a>
            </div>
            ))}
          </div>
          <button className={styles.arrow} onClick={(()=>{document.querySelector("main div div")?.scrollBy(500, 0)})}>&rarr;</button>
        </div>

        
        <div className={styles.grid}>
        {Array(5).fill(0).map((_, i) => (
          <div className={styles.card} key={i}>
            <Image src="https://e-cdns-images.dzcdn.net/images/cover/638ad930e4f20376e8a2851d9c41be00/250x250-000000-80-0-0.jpg" alt="Vinyl" width={250} height={250} />
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
