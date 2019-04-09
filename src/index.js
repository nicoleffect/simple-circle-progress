import Circle from './Circle'

function circleProgress ({
  canvas,
  total,
  rate,
  clockwise,
  dash,
  lineCap,
  circleStyle = '#fdf6a4',
  lineWidth = 10,
  trackStyle = '#ffffff',
  textStyle = '#ffffff'
}) {
  return new Circle({
    canvas,
    total,
    rate,
    clockwise,
    dash,
    lineCap,
    circleStyle,
    lineWidth,
    trackStyle,
    textStyle
  })
}

export default circleProgress
