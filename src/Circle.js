import { setContext } from './utils'

function drawCircle ({ strokeStyle, lineWidth, speed, dash = false, clockwise = false }) {
  this.save()
  dash && this.setLineDash([(Math.PI * 88 / lineWidth - 2), 2])
  this.strokeStyle = strokeStyle
  this.lineWidth = lineWidth
  this.beginPath()
  this.arc(centerX, centerY, centerX - lineWidth, -Math.PI / 2, -Math.PI / 2 + speed * Math.PI * 2 / 100, clockwise)
  this.stroke()
  this.restore()
}

function drawText ({ centerX, centerY, fillStyle, textFont, content }) {
  this.save()
  this.fillStyle = fillStyle
  this.font = textFont
  this.textAlign = 'center'
  this.fillText(parseInt(content), centerX, centerY)
  this.restore()
}

class Circle {
  constructor ({ canvas, total, speed, clockwise, dash, circleStyle, circleWidth, textStyle, textFont, trackStyle, trackWidth }) {
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
    this.total = total
    this.speed = speed
    this.clockwise = clockwise
    this.circleStyle = circleStyle
    this.circleWidth = circleWidth
    this.textStyle = textStyle
    this.textFont = textFont
    this.trackStyle = trackStyle
    this.trackWidth = trackWidth
    // console.log(2)
    if (speed > 0) {
      this.anim()
    } else {
      this.draw()
    }
  }
  draw () {
    const {
      centerX,
      centerY,
      fillStyle,
      textFont,
      total,

    } = this
    drawText.call(this.ctx, { centerX, centerY, fillStyle, textFont, content: total })
    drawCircle()
  }
  anim () {

  }
}

export default Circle
