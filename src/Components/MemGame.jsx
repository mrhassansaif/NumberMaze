import "./MemoryGame.css";
import React, { useState, useEffect, useRef } from "react";
// import "./MemGame.css";

const GenNumber = ({ level, wrong, question }) => {
  const [preContent, setPreContent] = useState(`
    -----------------------------------------------------

      ██╗        ██╗    ██╗  
     ██╔╝       ██╔╝    ╚██╗ 
    ██╔╝       ██╔╝      ╚██╗
    ╚██╗      ██╔╝       ██╔╝
     ╚██╗    ██╔╝       ██╔╝ 
      ╚═╝    ╚═╝        ╚═╝  
                              
    Greetings developers, Shall we play a game?

    Re-type the number you see below. Ez right?

    -----------------------------------------------------
  `);

  const numberRef = useRef(null);

  useEffect(() => {
    let time, digit;
    digit = level.main + 2;
    time = 100 * Math.min(digit, 5) + 400 * Math.max(digit - 5, 0);

    setTimeout(() => {
      setPreContent((prevContent) => prevContent.replace(/\w/gi, "&#183;"));
    }, time);
  }, [level.main]);

  useEffect(() => {
    setTimeout(() => {
      setPreContent((prevContent) => prevContent.replace(/\w|\W/gi, "&#183;"));
    }, 1200);
  }, []);

  return (
    <div className="app__gen-number">
      <div className="content">
        <pre dangerouslySetInnerHTML={{ __html: preContent }} />
      </div>
      <div className="app__info">
        <p className="app__level">
          Level: {level.main} - {level.sub}
        </p>
        <p className="app__wrong">Wrong: {wrong}/3</p>
      </div>
      <p className="app__divider">############################</p>
      <p className="app__number" ref={numberRef}>
        {wrong < 3 ? atob(question) : "???"}
      </p>
      <p className="app__divider">############################</p>
    </div>
  );
};

const InputNumber = ({ wrong, compareUserInput, onReset }) => {
  const userNumberRef = useRef(null);

  const handleUserInput = (e) => {
    e.preventDefault();
    let userNumber = btoa(userNumberRef.current.value);
    userNumberRef.current.value = "";
    compareUserInput(userNumber);
  };

  return (
    <div className="app__input">
      {wrong < 3 ? (
        <form onSubmit={handleUserInput}>
          Number is:
          <input
            pattern="[0-9]+"
            type="text"
            ref={userNumberRef}
            required
            autoFocus
          />
          <br />
          <br />
          <button onClick={onReset}>Restart</button>
        </form>
      ) : (
        <div className="app__end">
          <div className="app__notify">Better luck next time (✧ω✧)</div>
          <br />
          <br />
          <button onClick={onReset}>Restart</button>
        </div>
      )}
    </div>
  );
};

const randomGenerate = (digit) => {
  let max = Math.pow(10, digit) - 1,
    min = Math.pow(10, digit - 1);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MemoryGame = () => {
  const [state, setState] = useState({
    question: btoa(randomGenerate(2)),
    level: { main: 1, sub: 1 },
    wrong: 0,
  });

  const resetState = () => {
    setState({
      question: btoa(randomGenerate(2)),
      level: { main: 1, sub: 1 },
      wrong: 0,
    });
  };

  const compareUserInput = (userNumber) => {
    let currQuestion = state.question,
      mainLevel = state.level.main,
      subLevel = state.level.sub,
      wrong = state.wrong,
      digit;

    if (userNumber === currQuestion) {
      if (subLevel < 3) {
        ++subLevel;
      } else if (subLevel === 3) {
        ++mainLevel;
        subLevel = 1;
      }
    } else {
      ++wrong;
    }
    digit = mainLevel + 2;

    setState({
      question: btoa(randomGenerate(digit)),
      level: { main: mainLevel, sub: subLevel },
      wrong: wrong,
    });
  };

  return (
    <div className="main__app">
      <GenNumber
        question={state.question}
        level={state.level}
        wrong={state.wrong}
      />
      <InputNumber
        compareUserInput={compareUserInput}
        wrong={state.wrong}
        onReset={resetState}
      />
    </div>
  );
};

export default MemoryGame;
