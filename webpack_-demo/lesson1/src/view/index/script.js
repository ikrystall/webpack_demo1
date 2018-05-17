

// document.write("hello world");

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import '../../style/style.styl'

const redux = require('redux'); 
class App extends Component {
  render() {
      return <h1> He,index! </h1>
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app'),
)