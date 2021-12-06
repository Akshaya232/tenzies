import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import Confetti from 'react-confetti';
function App() {
  const [rollCount, setRollCount] = useState(0);
  const allNewDice = () => {
    // return [...new Array(10)].map(() =>
    //   Math.floor(Math.random() * (max - min + 1) + min)
    // );

    let randomArray = [];
    for (let i = 0; randomArray.length < 10; i++) {
      const temp = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: Math.random() * i + 2,
      };
      randomArray.push(temp);
    }
    return randomArray;
  };
  const rollDice = () => {
    if (tenzies) {
      setTenzies(false);
      setRollCount(0);
      setDieArray(allNewDice());
    } else {
      setRollCount(prevCount => prevCount + 1);
      setDieArray(prevDieArray =>
        prevDieArray.map(die => {
          return !die.isHeld
            ? { ...die, value: Math.ceil(Math.random() * 6) }
            : die;
        })
      );
    }
  };
  const holdDice = id => {
    setDieArray(prevDieArray =>
      prevDieArray.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };
  const [dieArray, setDieArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    let isWon = true;
    const dieNum = dieArray[0].value;
    for (let i = 0; i < dieArray.length; i++) {
      if (!dieArray[i].isHeld || dieNum !== dieArray[i].value) {
        isWon = false;
        break;
      }
    }
    if (isWon) setTenzies(true);
  }, [dieArray]);

  return (
    <main className='main-container'>
      <h1 className='title'>Tenzies</h1>
      {tenzies && (
        <h3 className='success-note'>
          Well Done!! You made it in {rollCount} rolls.
        </h3>
      )}
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className='grid'>
        {dieArray.map(die => (
          <Die die={die} key={die.id} handleHold={() => holdDice(die.id)} />
        ))}
      </div>
      <button className='roll-btn' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
      {tenzies && <Confetti className='confetti' />}
    </main>
  );
}

export default App;
