// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timerStarted: false, minutes: 25, seconds: '00'}

  onStartOrPauseTimer = () => {
    const {timerStarted, minutes, seconds} = this.state

    if (timerStarted === false) {
      let totalSeconds = minutes * 60 + parseInt(seconds)
      this.timerId = setInterval(() => {
        totalSeconds -= 1
        let newMinutes = Math.floor(totalSeconds / 60)
        if (newMinutes < 10) {
          newMinutes = `0${newMinutes}`
        }
        let newSeconds = totalSeconds - newMinutes * 60
        if (newSeconds < 10) {
          newSeconds = `0${newSeconds}`
        }
        this.setState({
          minutes: newMinutes,
          seconds: newSeconds,
          timerStarted: true,
        })
      }, 1000)
    } else {
      clearInterval(this.timerId)
      this.setState({timerStarted: false})
    }
  }

  onResetTimer = () => {
    clearInterval(this.timerId)
    this.setState({timerStarted: false, minutes: 25, seconds: '00'})
  }

  decreaseTimer = () => {
    const {timerStarted} = this.state
    if (timerStarted === false) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  increaseTimer = () => {
    const {timerStarted} = this.state
    if (timerStarted === false) {
      this.setState(prevState => ({minutes: prevState.minutes + 1}))
    }
  }

  render() {
    const {timerStarted, minutes, seconds} = this.state
    const startOrPauseImageUrl = timerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = timerStarted ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-container">
            <div className="timer-bg-container">
              <div className="timer-text">
                <h1 className="timer-display-heading">
                  {minutes}:{seconds}
                </h1>
                <p className="timer-display-para">
                  {timerStarted ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="buttons-container">
              <button
                className="timer-controller-btn"
                onClick={this.onStartOrPauseTimer}
                type="button"
              >
                <img
                  alt={startOrPauseAltText}
                  className="timer-controller-icon"
                  src={startOrPauseImageUrl}
                />
                <p className="timer-controller-label">
                  {timerStarted ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                className="timer-controller-btn"
                onClick={this.onResetTimer}
                type="button"
              >
                <img
                  alt="reset icon"
                  className="timer-controller-icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <p className="timer-controller-label">Reset</p>
              </button>
              <p className="time-limit">Set Timer limit</p>
              <div className="limit-container">
                <button
                  onClick={this.decreaseTimer}
                  className="limit-button"
                  type="button"
                >
                  -
                </button>
                <p className="set-limit">{minutes}</p>
                <button
                  onClick={this.increaseTimer}
                  className="limit-button"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
