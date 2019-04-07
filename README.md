# simple-circle-progress

dot and line, dots to dots connect

[demo -->](https://nicoleffect.github.io/simple-circle-progress/examples/index.html)

## mode

```
amd、cjs、es、iife、umd
```

## examples

```
// html
<canvas id="canvas"></canvas>

// js

// npm install simple-circle-progress
import circleProgress from 'simple-circle-progress'

 circleProgress({
  canvas: document.getElementById('canvas'), // require
  color: '255,255,255', // default
  r: 4, // default
  distance: 100, // default, distance of dot to dot
  isConnect: true, // default, if you don't need lines, set it false
  isOnClick: true, // default, event for click or touchstart
  isOnMove: true// default
 })

// or

<script src="https://nicoleffect.github.io/simple-circle-progress/dist/simple-circle-progress.umd.min.js"></script>
<script>
  const canvas = document.getElementById('canvas')
  circleProgress({ canvas })
</script>

```
