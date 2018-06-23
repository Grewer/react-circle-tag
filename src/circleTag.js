import React, {Component} from 'react';
import './index.css';
import PropTypes from 'prop-types';


class CircleTag extends Component {
  constructor(props) {
    super(props)
    let {data} = props
    const countValue = data.reduce((t, o) => {
      return t + o.value
    }, 0)

    const store = data.map(i => {
      i.percent = ((+i.value) / countValue).toFixed(2)
      return i
    }).sort((p, n) => {
      return n.value - p.value
    })
    this.$data = {
      store,
      countValue,
      maxPercent: store[0].percent,
    }
  }

  getRadius(percent, isFirst) { // 直径
    const {maxRadius, maxPercent} = this.$data
    return isFirst ? maxRadius : (percent / maxPercent) * maxRadius
  }

  stepFirst() {
    let {store, width, height} = this.$data
    for (let i = 0, l = store.length; i < l; i++) {
      let radius = this.getRadius(store[i].percent, i === 0) / 2 // 半径
      store[i].radius = radius
      let pX, pY
      if (i === 0) {
        pX = width / 2
        pY = height / 2
        store[0].px = pX
        store[0].py = pY
      } else {
        pX = Math.floor(Math.random() * (width - radius * 2)) + radius
        pY = Math.floor(Math.random() * (height - radius * 2)) + radius
        // 检验是否与已知圆重叠
        if (!this.check(pX, pY, radius, i)) {
          this.stepTwo(pX, pY, radius, i)
          continue;
        }
        store[i].px = pX
        store[i].py = pY
      }
    }
  }

  stepTwo(px, py, radius, i) {
    let {store, width} = this.$data

    const maxWidth = width - radius
    if (px > width / 2) {
      while (px > radius) {
        px--
        if (this.check(px, py, radius, i)) {
          store[i].px = px
          store[i].py = py
          break
        }
      }
    } else {
      while (px < maxWidth) {
        px++
        if (this.check(px, py, radius, i)) {
          store[i].px = px
          store[i].py = py
          break
        }
      }
    }
    if (!store[i].px && !store[i].py) {
      this.stepThree(radius, i)
    }

  }

  stepThree(radius, t) {
    let {store, width, height} = this.$data

    const maxWidth = width - radius
    const maxHeight = height - radius
    for (let i = radius; i < maxWidth; i++) {
      for (let j = radius; j < maxHeight; j++) {
        if (this.check(i, j, radius, t)) {
          store[t].px = i
          store[t].py = j
          return;
        }
      }
    }
  }

  check(px, py, radius, i) {
    let {store} = this.$data
    for (let j = 0; j < i; j++) {
      const obj = store[j]
      if (obj.px && obj.py) {
        if (px > obj.px - obj.radius && px < obj.px + obj.radius) {
          if (py > obj.py - obj.radius && py < obj.py + obj.radius) {
            return false
          }
        }
      }
    }
    return true
  }

  addBall(index, radius, x, y, value, color1, color2, docfrag) {
    let section = document.createElement('div')
    section.style.width = radius + 'px'
    section.style.height = radius + 'px'
    section.style.left = x + 'px'
    section.style.top = y + 'px'
    let figure = document.createElement('figure')
    figure.className = 'ball'
    figure.style.background = `radial-gradient(circle at 50% 120%, ${color1}, ${color2} 100%)`
    figure.style.textAlign = 'center';
    figure.style.color = '#fff'
    figure.style.lineHeight = radius + 'px'
    let text = document.createTextNode(value)
    figure.appendChild(text)
    section.appendChild(figure)
    docfrag.appendChild(section)
  }

  componentDidMount() {
    const obj = this.refs.grewer
    let {height, width} = this.props
    width = width || obj.clientWidth
    height = height || obj.clientHeight
    obj.style.width = width + 'px'
    obj.style.height = height + 'px'
    this.$data = {
      ...this.$data,
      width, height,
      maxRadius: .5 * (width > height ? height : width)
    }
    this.stepFirst()
    let {store} = this.$data
    let docfrag = document.createDocumentFragment();
    store.forEach((item, index) => {
      let radius = item.radius * 2
      const alpha = (Math.random() * 0.5 + 0.5).toFixed(2)
      const color1 = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
      let mainColor = `rgba(${color1[0]}, ${color1[1]} , ${color1[2]},${alpha})`
      const color2 = color1.map(i => Math.floor(i * 0.5))
      let tColor = `rgba(${color2[0]}, ${color2[1]} , ${color2[2]},${alpha})`
      this.addBall(index, radius, item.px, item.py, item.value, mainColor, tColor, docfrag)
    })
    obj.appendChild(docfrag)
    // 后续使用 mvvm 方式插入 需添加 load 属性
  }

  clickCb = ({target}) => {
    if (target.nodeName === 'FIGURE') {
      this.props.callback && this.props.callback(target, target.textContent) // to add type
    }
  }

  render() {
    return (
      <div id="grewer" ref="grewer" onClick={this.clickCb}>
      </div>
    )
  }
}

export default CircleTag;
