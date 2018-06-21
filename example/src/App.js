import React, { Component } from 'react';
import './App.css';
import Circle from 'react-circle-tag'
const data = [
  {
    type: '语文',
    value: 50
  },
  {
    type: '数学',
    value: 80
  },
  {
    type: '英语',
    value: 20
  },
  {
    type: '物理',
    value: 77
  },
  {
    type: '化学',
    value: 66
  },
  {
    type: '生物',
    value: 33
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Circle data={data} width="500" height="300" />
      </div>
    );
  }
}

export default App;
