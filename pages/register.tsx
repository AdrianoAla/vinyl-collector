import styles from '/styles/Home.module.css';
import { useAuth } from '../contexts/authContext'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Login() {
    const router = useRouter()
    const { user, signup } = useAuth()

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault()
    
        console.log(user)
        try {
          await signup(email, password, username);
          router.push('/')
        } catch (err) {
          console.log(err)
        }
      }

    useEffect(() => {
      router.push('/login')
    }, [])

    return (
        <div className={styles.container}>
            <Head>
              <title>Vinylist</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content="Welcome to Vinylist, an app for tracking your vinyl collection over time." />
            </Head>
            <h1>Register</h1>
            {/*<input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>*/}
            {/* <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handleLogin}>Register</button> */}
        </div>
    )
}