import React from 'react'
import styles from '@/styles/login/Login.module.scss'
import { Button } from '@mui/material'
import { auth, provider } from '@/firebase'
import { signInWithPopup } from 'firebase/auth'

function Login() {

    const signIn = () => {
        signInWithPopup(auth, provider).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <div className={styles.login}>
            <div className={styles.loginLogo}>
                <img src='./discordIcon.png' alt="" />
            </div>
            <Button onClick={signIn}>ログイン</Button>
        </div>
    );
};

export default Login