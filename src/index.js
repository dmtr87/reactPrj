import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

const Header = () => {
  return <h2>Hello World</h2>
}
const Field = () => {
  return <input type="type" placeholder="type here"/>
}
const Btn = () => {

  const text = "Log In"

  const res = () => {
    return "Log In, pl"
  }

  const logger = false;

  return <button>{logger ? "Enter": text}</button>

}

const App = () => {
  return (
    <div>
      <Header/>
      <Field/>
      <Btn/>
  </div>
  )

}


ReactDOM.render(<App/>,document.getElementById('root')
);
