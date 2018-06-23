import React, {Component} from 'react';
import './App.css';
// import Circle from 'react-circle-tag'
import Circle from './test'

const data = [
  {
    type: '语文',
    value: 50,
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
  clickCb(target, value, type) {
    console.log(target, value, type)
  }

  render() {
    return (
      <div className="App">
        <Circle data={data} height="300" callback={this.clickCb}/>
      </div>
    );
  }
}

export default App;
