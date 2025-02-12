import styles from "@/styles/Home.module.scss";
import Sidebar from "@/components/sidebar/Sidebar";
import Chat from "@/components/chat/Chat";
import Login from "@/components/login/Login";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { auth } from "@/firebase";
import { login, logout } from "@/features/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/utils/ErrorFallback";

export default function Home() {

  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if(loginUser) {
        dispatch(
          login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  return (
      <div className={styles.home}>
        {user ? (
          <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Sidebar />
            </ErrorBoundary>
            <Chat />
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>  
  );
}
