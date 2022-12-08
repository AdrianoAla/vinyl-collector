import styles from '/styles/Home.module.css';
import { useAuth } from '../contexts/authContext'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Login() {
    const router = useRouter()
    const { user, login } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault()
    
        console.log(user)
        try {
          await login(email, password)
          router.push('/')
        } catch (err) {
          console.log(err)
        }
      }

    return (
        <div className={styles.container}>
            <Head>
              <title>Vinylist</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content="Welcome to Vinylist, an app for tracking your vinyl collection over time." />
            </Head>
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}