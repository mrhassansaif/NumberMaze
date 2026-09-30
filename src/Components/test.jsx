// Number Maze — main memory game component
import { Component } from "react";

import "./MemGame.css";

class GenNumber extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.question === this.props.question &&
      prevProps.wrong === this.props.wrong
    ) {
      return;
    }

    let time, digit;
    digit = this.props.level.main + 2;
    time = 100 * Math.min(digit, 5) + 400 * Math.max(digit - 5, 0);

    let number = document.getElementById("number");
    setTimeout(function () {
      number.innerHTML = number.innerHTML.replace(/\w/gi, "&#183;");
    }, time);
  }

  componentDidMount() {
    let number = document.getElementById("number");
    setTimeout(function () {
      number.innerHTML = number.innerHTML.replace(/\w|\W/gi, "&#183;");
    }, 1200);
  }

  render() {
    const isLost = this.props.wrong >= 3;
    const feedback = this.props.feedback;

    return (
      <div className="app__gen-number">
        <div className="content intro">
          <div className="intro__maze" aria-hidden="true">
            <span className="intro__node">3</span>
            <span className="intro__wire" />
            <span className="intro__node intro__node--ghost">?</span>
            <span className="intro__wire" />
            <span className="intro__node intro__node--pulse">7</span>
            <span className="intro__wire" />
            <span className="intro__node">1</span>
            <span className="intro__wire intro__wire--bend" />
            <span className="intro__node intro__node--goal">◆</span>
          </div>
          <p className="intro__greet">
            Greetings developers, Shall we play a game?
          </p>
          <p className="intro__hint">
            Re-type the number you see below. Ez right?
          </p>
        </div>

        <div className="app__info">
          <p className="app__level">
            Level: {this.props.level.main} – {this.props.level.sub}
          </p>
          <p
            className={`app__wrong${this.props.wrong > 0 ? " app__wrong--active" : ""}`}
          >
            Wrong: {this.props.wrong}/3
          </p>
        </div>

        <div
          className={`app__number-panel${
            feedback === "correct"
              ? " app__number-panel--correct"
              : feedback === "wrong"
                ? " app__number-panel--wrong"
                : ""
          }${isLost ? " app__number-panel--lost" : ""}`}
        >
          <p
            className="app__number"
            id="number"
            key={this.props.question + "-" + this.props.wrong}
          >
            {this.props.wrong < 3 ? atob(this.props.question) : "????"}
          </p>
        </div>
      </div>
    );
  }
}

class InputNumber extends Component {
  constructor() {
    super();
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleUserInput(e) {
    e.preventDefault();
    let userNumber = btoa(this.userNumber.value);
    this.userNumber.value = "";
    this.props.compareUserInput(userNumber);
  }

  handleReset() {
    this.props.onReset();
  }

  render() {
    let layout;
    if (this.props.wrong < 3) {
      layout = (
        <div className="app__input">
          <form className="app__form" onSubmit={this.handleUserInput}>
            <label className="app__label" htmlFor="user-number">
              Number is:
            </label>
            <input
              id="user-number"
              className="app__field"
              pattern="[0-9]+"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              ref={(ref) => (this.userNumber = ref)}
              required
              autoFocus
              aria-label="Enter the number you memorized"
            />
            <button
              type="button"
              className="app__button"
              onClick={this.handleReset}
            >
              Restart
            </button>
          </form>
        </div>
      );
    } else {
      layout = (
        <div className="app__end">
          <div className="app__notify">Better luck next time (✧ω✧)</div>
          <button
            type="button"
            className="app__button app__button--primary"
            onClick={this.handleReset}
          >
            Restart
          </button>
        </div>
      );
    }

    return layout;
  }
}

class MemoryGame extends Component {
  constructor() {
    super();
    this.compareUserInput = this.compareUserInput.bind(this);
    this.randomGenerate = this.randomGenerate.bind(this);
    this.resetState = this.resetState.bind(this);
    this.clearFeedback = this.clearFeedback.bind(this);
    this.feedbackTimer = null;
    this.state = {
      question: btoa(this.randomGenerate(2)),
      level: { main: 1, sub: 1 },
      wrong: 0,
      feedback: null,
    };
  }

  componentWillUnmount() {
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
  }

  clearFeedback() {
    this.setState({ feedback: null });
  }

  resetState() {
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
    this.setState({
      question: btoa(this.randomGenerate(2)),
      level: { main: 1, sub: 1 },
      wrong: 0,
      feedback: null,
    });
  }

  randomGenerate(digit) {
    let max = Math.pow(10, digit) - 1,
      min = Math.pow(10, digit - 1);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  compareUserInput(userNumber) {
    let currQuestion = this.state.question,
      mainLevel = this.state.level.main,
      subLevel = this.state.level.sub,
      wrong = this.state.wrong,
      digit,
      feedback;

    if (userNumber === currQuestion) {
      feedback = "correct";
      if (subLevel < 3) {
        ++subLevel;
      } else if (subLevel === 3) {
        ++mainLevel;
        subLevel = 1;
      }
    } else {
      feedback = "wrong";
      ++wrong;
    }
    digit = mainLevel + 2;

    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }

    this.setState({
      question: btoa(this.randomGenerate(digit)),
      level: { main: mainLevel, sub: subLevel },
      wrong: wrong,
      feedback: feedback,
    });

    this.feedbackTimer = setTimeout(this.clearFeedback, 450);
  }

  render() {
    return (
      <div className="main__app">
        <div className="game__shell">
          <header className="game__header">
            <p className="game__brand">Number Maze</p>
            <p className="game__tagline">Test your memory. Beat your best.</p>
          </header>

          <GenNumber
            question={this.state.question}
            level={this.state.level}
            wrong={this.state.wrong}
            feedback={this.state.feedback}
          />
          <InputNumber
            compareUserInput={this.compareUserInput}
            wrong={this.state.wrong}
            onReset={this.resetState}
          />
        </div>
      </div>
    );
  }
}

export default MemoryGame;
