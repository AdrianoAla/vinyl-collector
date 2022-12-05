
import styles from '../styles/Card.module.css'

export default function Card({ Title, URL, Key }: { Title: string, URL: string, Key: number }) {
    return (
    <div className={styles.card} key={Key}>
        <picture>
            <source srcSet={URL}/>
            <img src={URL} alt="Vinyl" width={250} height={250} />
        </picture>
        <div>
            <h3>{Title}</h3>
        </div>
    </div>
    )
}