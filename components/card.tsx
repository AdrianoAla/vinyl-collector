import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from '../styles/Card.module.css'
import { arrayRemove, doc, collection, arrayUnion, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';
import { db } from '../config/firebase';

export default function Card({ Title, URL, Key, Id, UID, Callback }: { Title: string, URL: string, Key: number, Id: string, UID: string, Callback: any }) {

    const UsersRef = collection(db, "Users");
    const {user} = useAuth();

    return (
    <Popup trigger={
        <div className={styles.card} key={Key}>
                <img src={URL} alt="Vinyl" width={250} height={250} />
            {/* <picture>
                <source srcSet={URL}/>
            </picture> */}
        </div>
    } position="top center">
        <div id={styles.popup}>
            <p>{Title}</p>
            {(UID == "-1" || user.uid ==  UID) ? (
            <>
                <a onClick={() => {
                    console.table({Title: Title, Img: URL, Id: Id, Favourite: false})
                    updateDoc(doc(UsersRef, user.uid), {
                        Vinyls: arrayRemove({Title: Title, Img: URL, Id: Id, Favourite: false}),
                        
                    })
                    .then (() => {
                        updateDoc(doc(UsersRef, user.uid), {
                            Vinyls: arrayUnion({Title: Title, Img: URL, Id: Id, Favourite: true})
                        })
                        .then(() => {
                            Callback({Title: Title, Img: URL, Favourite: false, Id: Id}, 'add')
                        })
                    })
                }} className={styles.option}>
                    <p>Add to favourites</p>
                </a>
                <a onClick={() => {
                    updateDoc(doc(UsersRef, user.uid), {
                        Vinyls: arrayRemove({Title: Title, Img: URL, Id: Id, Favourite: false}),
                        
                    })
                    .then (()=>{
                        Callback({Title: Title, Img: URL, Favourite: false, Id: Id}, 'remove');
                    })
                    
                }} className={styles.option}>
                    <p>Remove from owned vinyls</p>
                </a>
            </>
            ) : null}
        </div>
    </Popup>
    )
}