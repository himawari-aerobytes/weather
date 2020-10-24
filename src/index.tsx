import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Container from '@material-ui/core/Container';

ReactDOM.render(
  <React.StrictMode>
    <div className="allContainer">
      <Container maxWidth="md">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <div className="container">
          <h1 className="Title">Weather Information</h1>
          <App />
        </div>
      </Container>
    </div>
    <footer>
      <p>
        このサイトのデータは<a href="https://jjwd.info/">jjwd.info</a>のAPIを利用しています。
      </p>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
