import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // user 의 로그인, 로그아웃 상태 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // listening for the change :
      // 1) user logged in
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing ..."
      )}
      <footer> &copy; Hawitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
