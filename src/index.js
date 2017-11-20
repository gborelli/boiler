import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';


const App = prop => (
  <div className={prop.className}>Test #1</div>
);


ReactDOM.render(
  <App className="main-wrapper" />,
  document.getElementById('main'),
);

