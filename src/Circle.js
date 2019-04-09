import { setContext } from './utils'

function drawCircle ({ centerX, centerY, strokeStyle, lineWidth, rate, dash = true, lineCap = 'butt', clockwise = true }) {
  this.save()
  if (lineCap === 'butt' && dash) {
    this.setLineDash([(Math.PI * 100 / lineWidth), 2])
  }
  this.lineCap = lineCap
  this.strokeStyle = strokeStyle
  this.lineWidth = lineWidth
  const sAngle = -Math.PI / 2
  const pi = Math.PI * 2 / 100 * rate
  let eAngle = clockwise ? sAngle - pi : sAngle + pi
  this.beginPath()
  this.arc(centerX, centerY, centerX - lineWidth, sAngle, eAngle, clockwise)
  this.stroke()
  this.restore()
}

function drawText ({ centerX, centerY, textStyle, textFont, content }) {
  this.save()
  this.fillStyle = textStyle
  this.font = textFont
  this.textAlign = 'center'
  this.textBaseline = 'middle'
  this.fillText(content, centerX, centerY)
  this.restore()
}

class Circle {
  constructor ({ canvas, total, rate, clockwise, dash, lineCap, circleStyle, lineWidth, trackStyle, textStyle }) {
    const {
      ctx,
      rect
    } = setContext(canvas)
    this.ctx = ctx
    const {
      width,
      height
    } = rect
    this.centerX = width / 2
    this.centerY = height / 2
    console.log(this.centerX)
    console.log(this.centerY)
    this.total = total
    this.rate = rate
    this.dash = dash
    this.lineCap = lineCap
    this.clockwise = clockwise
    this.circleStyle = circleStyle
    this.lineWidth = lineWidth
    this.textStyle = textStyle
    this.trackStyle = trackStyle
    // console.log(2)
    if (rate > 0) {
      this.anim()
    } else {
      this.draw()
    }
  }
  draw () {
    const {
      centerX,
      centerY,
      textStyle,
      circleStyle,
      lineWidth,
      total,
      rate,
      dash,
      lineCap,
      clockwise,
      trackStyle
    } = this
    if (trackStyle) {
      drawCircle.call(this.ctx, { centerX, centerY, strokeStyle: trackStyle, lineWidth, rate: 100, dash })
    }
    drawText.call(this.ctx, { centerX, centerY, textStyle, textFont: `${Math.floor(centerX / 1.5)}px sans-serif`, content: parseInt(total) })
    drawCircle.call(this.ctx, { centerX, centerY, strokeStyle: circleStyle, lineWidth, rate: total, dash, lineCap, clockwise })
  }
  anim () {

  }
}

export default Circle
