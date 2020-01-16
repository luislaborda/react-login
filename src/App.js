import React, { useState } from 'react'
import LoginForm from './Components/LoginForm/LoginForm';
import Admin from './Components/Admin';
import logo from './logo.svg';
import './App.css';

function App() {

  const [authenticated, setAuthenticated] = useState(false)

  const setAuth = (auth) => {
    setAuthenticated(auth)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="loginWrapper">
        <LoginForm authenticate={ setAuth } auth={authenticated}>
            <Admin />
        </LoginForm>
      </section>
      <footer>
        <p>copyright 2020</p>
      </footer>
    </div>
  );
}

export default App;
