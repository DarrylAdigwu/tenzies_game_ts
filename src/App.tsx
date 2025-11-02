import { useState, useEffect, useRef } from 'react';
import type { JSX } from 'react';
import Die from './Die.tsx';
import { nanoid } from 'nanoid';

import ConfettiContainer from './component/ConfettiContainer.tsx';

type NewDice = {
  value: number,
  isHeld: boolean,
  id: string
};

export default function App(): JSX.Element {
  const [dice, setDice] = useState<NewDice[]>(() => generateAllNewDice())
  const buttonFocus = useRef<HTMLButtonElement>(null)

  // Variable to determine if game is won
  const gameWon: boolean = dice.every((die: NewDice): boolean => die.isHeld) 
  && dice.every((die: NewDice): boolean => die.value === dice[0].value)

  // Put focus on new game button for accessiblity
  useEffect(() => {
    if(gameWon) {
      buttonFocus.current?.focus()
    }
  }, [gameWon])

  // Generate initial and all new dice
  function generateAllNewDice(): NewDice[] {
    let allDice = []
    
    for(let i = 0; i < 10; i++) {
      const randomNum: number = Math.ceil(Math.random() * 6)
      allDice.push({
        value: randomNum,
        isHeld: false, 
        id : nanoid()
      })
    }
    return allDice
  }
  
  // Hold Dice
  function holdDice(id: string): void {
    setDice(die => die.map((item: NewDice)=> {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }

  // Reroll dice
  function rollDice(): void {
    setDice(prevDice => prevDice.map((die: NewDice): NewDice => {
      return die.isHeld ? {...die} : {...die, value:  Math.ceil(Math.random() * 6)}
    }))
  }

  // Creating each dice for Die component
  const diceButtons = dice.map(die => {
    return (
      <Die 
        value={die.value} 
        key={die.id} 
        id={die.id} 
        isHeld={die.isHeld} 
        holdDice={holdDice}
      />
    )
  })

  // Setting up a new game for user
  function newGame(): void {
    setDice(generateAllNewDice())
  }


  return (
    <main className="gameboard">
      <ConfettiContainer
        gameWon={gameWon}
      />
      <div className="sr-only" aria-live='polite'>
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <div className="content">
        <div className="game-info">
          <h1>Tenzies</h1>
          <p>
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.<br />
              <br/>When all the die are matching, you win!
          </p>
        </div>
        <div className="die-container">
          {diceButtons}
        </div>
        <button className='roll-dice' onClick={gameWon ? newGame : rollDice} ref={buttonFocus}>{gameWon ? "New Game" : "Roll"}</button>
      </div>
      
      </main>
  )
}
