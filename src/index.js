import Circle from './Circle'

function circleProgress ({
  canvas,
  isAnim = true,
  rate,
  clockwise,
  dash,
  lineCap,
  circleStyle = '#000000',
  lineWidth = 10,
  orbitStyle = '',
  textStyle = '#000000',
  textBaseline = 'middle'
  // textBaseline = 'alphabetic'
  // textBaseline = 'hanging'
}) {
  return new Circle({
    canvas,
    isAnim,
    rate,
    clockwise,
    dash,
    lineCap,
    circleStyle,
    lineWidth,
    orbitStyle,
    textStyle,
    textBaseline
  })
}

export default circleProgress
