import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <header>
        <div id='l-personalPanel'>
          <span>Клиентский сервис: <a href='mailto:claim@m-food.ru'>claim@m-food.ru</a></span>
          <a href='/auth/'>Войти</a>
        </div>
        <div id='l-menuPanel'>
          <a href='/'>
            <img src='/src/img/logo.svg' alt='логотип компании'/>
          </a>
        </div>
      </header>
    )
  }
}

export default App;
