import Link from 'next/link'
import styles from '../styles/Nav.module.css'
import { useAuth } from '../contexts/authContext'

export default function Nav({ user }: {user: any})  {
    const auth =useAuth();
    return (
        <nav className={styles.navbar}>
                <div className={styles.navbar_logo}>
                <Link href="/"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="60px" height="60px"><path fill="#455a64" d="M38.141,9.856c-7.808-7.808-20.473-7.808-28.281,0c-7.813,7.812-7.813,20.476,0,28.285c7.808,7.812,20.473,7.812,28.281,0C45.953,30.332,45.953,17.668,38.141,9.856z"/><path fill="#90a4ae" d="M9.855 38.14c1.184 1.184 2.492 2.167 3.865 2.993l9.198-15.333c-.144-.086-.284-.185-.407-.312-.127-.123-.226-.263-.313-.407L6.866 34.279C7.692 35.653 8.675 36.96 9.855 38.14zM38.141 9.856c-1.18-1.18-2.488-2.163-3.861-2.989l-9.198 15.333c.144.086.284.185.407.312.127.123.226.263.313.407l15.333-9.198C40.308 12.347 39.325 11.04 38.141 9.856z"/><path fill="#263238" d="M30.366,17.634c-3.51-3.51-9.223-3.51-12.733,0c-3.513,3.51-3.513,9.223,0,12.733c3.51,3.513,9.223,3.513,12.733,0C33.876,26.857,33.876,21.143,30.366,17.634z"/><path fill="#ffc107" d="M28.949,19.051c-2.734-2.734-7.164-2.734-9.898,0s-2.734,7.164,0,9.898s7.164,2.734,9.898,0S31.684,21.785,28.949,19.051z M22.586,25.414c-0.781-0.781-0.781-2.047,0-2.828s2.047-0.781,2.828,0s0.781,2.047,0,2.828S23.367,26.195,22.586,25.414z"/></svg></Link>
                <Link href="/"><h3>Vinylist</h3></Link>
                </div>
                {user != null ? (
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/search">Search</Link>
                    </li>
                    <li>
                        <a onClick={()=>{auth.logout()}}>Logout</a>
                    </li>
                </ul>
                ) : (
                    <ul>
                        <li>
                            <Link href="/login">Log in</Link>
                        </li>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                    </ul>
                ) }
        </nav>
    )
}