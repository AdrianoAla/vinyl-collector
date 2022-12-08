import Popup from 'reactjs-popup'
import styles from '../styles/Favourite.module.css'
import {collection, doc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore'
import { db } from '../config/firebase';
import { useAuth } from '../contexts/authContext';

export default function Favourite({ Title, URL, Key, Id, Callback }: { Title: string, URL: string, Key: number, Id: string, Callback: any}) {

    const UsersRef = collection(db, "Users");
    const { user } = useAuth();

    return (
        <Popup trigger={
            <div className={styles.vinyl} key={Key}>
                <a>
                <picture>
                    <source srcSet={URL}/>
                    <img src={URL} alt="Vinyl" width={120} height={120} />
                </picture>
                {/* {Title} */}
                </a>
            </div>
        } position="bottom center">
            <div id={styles.popup}>
                <p>{Title}</p>
                <a onClick={() => {
                    updateDoc(doc(UsersRef, user.uid), {
                        Vinyls: arrayRemove({Title: Title, Img: URL, Id: Id, Favourite: true}),
                        
                    })
                    .then (() => {
                        updateDoc(doc(UsersRef, user.uid), {
                            Vinyls: arrayUnion({Title: Title, Img: URL, Id: Id, Favourite: false})
                        })
                        .then (()=>{
                            Callback({Title: Title, Img: URL, Id: Id, Favourite: true})
                        })
                    })
                }} className={styles.option}>
                <p>
                    Remove from favourites
                </p></a>
            </div>
        </Popup>
    )
}