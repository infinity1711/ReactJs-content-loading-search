import React from 'react';
import './App.css';
import { Home } from './components/home';
import { createStore, applyMiddleware } from "redux";
import reducers from './redux-config/reducers';
import { Provider } from "react-redux";


const store = createStore(reducers);

function App() {

  store.subscribe(() => {
    console.log("Store =====>>>> ", store.getState())
  })

  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
