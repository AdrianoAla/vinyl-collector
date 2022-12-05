import styles from '../styles/Favourite.module.css'


export default function Favourite({ Title, URL, Key }: { Title: string, URL: string, Key: number}) {
    return (
            <div className={styles.vinyl} key={Key}>
                <a href="https://google.com/">
                <picture>
                    <source srcSet={URL}/>
                    <img src={URL} alt="Vinyl" width={120} height={120} />
                </picture>
                {Title}
                </a>
            </div>
    )
}