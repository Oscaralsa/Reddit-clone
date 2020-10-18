import React, {useState} from 'react';
import Home from "./pages/Home"

export default function App() {
  const [user] = useState("Oscar")
  return (  
    <div>
      <Home />
      {user ? <h1>Estás loggeado</h1> : <h1>No Estás loggeado</h1>}
    </div>
  );
}

