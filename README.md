# simple-circle-progress

a simple circe progress

[demo -->](https://nicoleffect.github.io/simple-circle-progress/examples/index.html)

## mode

```
amd、cjs、es、iife、umd
```
## usage
```
circleProgress ({
  canvas,
  isAnim = true, // default
  rate, // number
  clockwise,
  dash,
  lineCap,
  circleStyle = '#000000', // default
  lineWidth = 10, // default
  orbitStyle = '',
  textStyle = '#000000' // default
})
```
## examples

![demo](https://nicoleffect.github.io/simple-circle-progress/examples/img/example.png)

```
// npm install simple-circle-progress
import circleProgress from 'simple-circle-progress'

circleProgress({
  canvas: document.getElementById('canvas0'),
  rate: 80
})

circleProgress({
  canvas: document.getElementById('canvas1'),
  rate: 76,
  orbitStyle: '#ffffff',
  circleStyle: '#2879ff'
})

circleProgress({
  canvas: document.getElementById('canvas2'),
  rate: 88,
  circleStyle: '#ffd50a',
  dash: true,
  orbitStyle: '#ffffff'
})

circleProgress({
  canvas: document.getElementById('canvas3'),
  rate: 82,
  circleStyle: '#84d276',
  textStyle: '#E57373',
  clockwise: true
})

circleProgress({
  canvas: document.getElementById('canvas4'),
  rate: 78,
  circleStyle: '#E57373',
  textStyle: '',
  lineCap: 'round',
  lineWidth: 18
})

```
