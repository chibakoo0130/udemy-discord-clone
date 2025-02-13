import React from 'react'
import styles from '@/styles/login/Login.module.scss'
import { Button } from '@mui/material'
import { auth, provider } from '@/firebase'
import { signInWithPopup } from 'firebase/auth'
import Image from 'next/image'

function Login() {

    const signIn = () => {
        signInWithPopup(auth, provider).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <div className={styles.login}>
            <div className={styles.loginLogo}>
                <Image src='/discordIcon.png' alt="" width={150} height={150} />
            </div>
            <Button onClick={signIn}>ログイン</Button>
        </div>
    );
};

export default Login