import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // user 의 로그인, 로그아웃 상태 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // listening for the change :
      // 1) user logged in
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing ..."}
      <footer> &copy; Hawitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
