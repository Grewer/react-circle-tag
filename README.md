## react tag plugin


### Instructions
This plugin can generate random round tags


### Diagram
![效果图](https://grewer.github.io/dataSave/react-tags.png)

### Props:
```js
CircleTag.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  height: PropTypes.number.isRequired,
  callback: PropTypes.func // func(target,value,type)
}
```