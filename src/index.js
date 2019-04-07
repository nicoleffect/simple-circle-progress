import Circle from './Circle'

function circleProgress ({
  canvas,
  total,
  speed,
  clockwise = false,
  dash = false,
  circleStyle = '#fdf6a4',
  circleWidth = 12,
  textStyle = '#ffffff',
  textFont = '34px sans-serif',
  trackStyle = '#ffffff',
  trackWidth = 12
}) {
  return new Circle({
    canvas,
    total,
    speed,
    clockwise,
    dash,
    circleStyle,
    circleWidth,
    textStyle,
    textFont,
    trackStyle,
    trackWidth
  })
}

export default circleProgress
