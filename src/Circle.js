import { setContext, isMobile } from './utils'

function drawCircle ({ centerX, centerY, strokeStyle, lineWidth, rate, dash = false, lineCap = 'butt', clockwise = false }) {
  this.save()
  const r = centerX - lineWidth / 2 - 1
  if (lineCap === 'butt' && dash) {
    this.setLineDash([(Math.PI * 2 * r / 12 - 2), 2])
  }
  this.lineCap = lineCap
  this.strokeStyle = strokeStyle
  this.lineWidth = lineWidth
  const sAngle = -Math.PI / 2
  const pi = Math.PI * 2 / 100 * rate
  let eAngle = clockwise ? sAngle - pi : sAngle + pi
  this.beginPath()
  this.arc(centerX, centerY, r, sAngle, eAngle, clockwise)
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
  constructor ({ canvas, isAnim, rate, clockwise, dash, lineCap, circleStyle, lineWidth, orbitStyle, textStyle }) {
    const {
      ctx,
      rect
    } = setContext(canvas)
    this.ctx = ctx
    this.rect = rect
    const {
      width,
      height
    } = this.rect
    this.centerX = width / 2
    this.centerY = height / 2
    this.dash = dash
    this.rate = rate
    this.lineCap = lineCap
    this.clockwise = clockwise
    this.circleStyle = circleStyle
    this.lineWidth = lineWidth
    this.textStyle = textStyle
    this.orbitStyle = orbitStyle
    this.completeCallback = null
    this.init(canvas, isAnim)
  }
  init (canvas, isAnim) {
    const {
      centerX,
      centerY,
      lineWidth,
      dash,
      rate
    } = this

    if (isAnim) {
      this.loading = false
      this.anim()
      const event = isMobile ? 'touchstart' : 'click'
      canvas.addEventListener(event, () => {
        this.anim()
      })
    } else {
      this.draw(rate)
    }
  }
  draw (rate) {
    const {
      centerX,
      centerY,
      textStyle,
      circleStyle,
      lineWidth,
      dash,
      lineCap,
      clockwise,
      orbitStyle
    } = this
    if (orbitStyle) {
      drawCircle.call(this.ctx, {
        centerX,
        centerY,
        strokeStyle: orbitStyle,
        lineWidth,
        rate: 100,
        dash
      })
    }
    textStyle && drawText.call(this.ctx, {
      centerX,
      centerY,
      textStyle,
      textFont: `${Math.floor(centerX / 1.5)}px sans-serif`,
      content: parseInt(rate)
    })
    drawCircle.call(this.ctx, {
      centerX,
      centerY,
      strokeStyle: circleStyle,
      lineWidth,
      rate,
      dash,
      lineCap,
      clockwise
    })
  }
  anim () {
    if (this.loading) {
      return
    }
    this.loading = true
    const requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    const cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame
    let speed = 1
    let animKey
    const {
      width,
      height
    } = this.rect
    const _this = this
    return (function _animateUpdate () {
      if (speed >= _this.rate) {
        cancelAnimFrame(animKey)
        _this.loading = false
        _this.completeCallback && _this.completeCallback()
        return
      }
      _this.ctx.clearRect(0, 0, width, height)
      _this.draw(speed)
      speed++
      animKey = requestAnimFrame(_animateUpdate)
    })()
  }
  onComplete (callback) {
    this.completeCallback = callback
  }
}

export default Circle
