import React from 'react';
import Routing from "./routes/Routing";
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

export default function App() {

  return (  
    <Provider store={store}>
      <BrowserRouter>
          <Routing />
      </BrowserRouter>
    </Provider>
  );
}

