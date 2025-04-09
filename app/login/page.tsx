"use client"

import styles from '../styles/Login.module.css';
import localFont from 'next/font/local';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Font = localFont({src: "../fonts/Martian-Mono.ttf"})

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage(data.message);
            router.push('/');
        } else {
            setMessage(data.message);
        }
    };
    
    return (
        <html><body style={{ "margin":"0", "padding":"0" }}>
        <div className={`${styles.container} ${Font.className}`}>
        <img src="/full_logo.png" alt="Logo" style={{ "position":"absolute", "top":"140px", "width":"400px" }}/>
            <div className={styles.loginBox}>
                <h1 className={styles.h1}>Вход</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label} htmlFor="login">Логин</label>
                    <input className={styles.input} type="text" id="login" name="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
                    
                    <label className={styles.label} htmlFor="password">Пароль</label>
                    <input className={styles.input} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button className={styles.button} type="submit">Войти</button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </div>
        </body></html>
    );
}