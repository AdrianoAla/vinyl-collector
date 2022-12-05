import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from '../styles/Card.module.css'

export default function Card({ Title, URL, Key }: { Title: string, URL: string, Key: number }) {
    return (
    <Popup trigger={
        <div className={styles.card} key={Key}>
            <picture>
                <source srcSet={URL}/>
                <img src={URL} alt="Vinyl" width={250} height={250} />
            </picture>
            <div>
                <h3>{Title}</h3>
            </div>
        </div>
    } position="top center">
        <div id={styles.popup}>
            <p>Options ({Title})</p>
            <a className={styles.option}>
                <p>Add to favourites</p>
            </a>
            <a className={styles.option}>
                <p>Remove from owned vinyls</p>
            </a>
        </div>
    </Popup>
    )
}