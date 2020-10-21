import React, { useState, useEffect } from 'react';
import Home from "./pages/Home";
import { AuthContext } from "./utils/context";
import { isUserLogged } from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState("");
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(()=> {
    setUser(isUserLogged());
    setRefreshCheckLogin(false)
    setLoadUser(true);
  }, [refreshCheckLogin])

  if(!loadUser) return null;

  return (  
    <AuthContext.Provider value={user}>
      {user ? <Routing /> : <Home setRefreshCheckLogin={setRefreshCheckLogin}/>}
    </AuthContext.Provider>
  );
}

