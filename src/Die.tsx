import type { JSX } from "react";

type DieProps = {
  value: number,
  isHeld: boolean,
  key: string,
  id: string,
  holdDice: (id: string) => void
}

export default function Die({
                              value, 
                              isHeld, 
                              id, 
                              holdDice
                            }: DieProps): JSX.Element {
  const styles: {backgroundColor: string} = {
    backgroundColor: isHeld ? "#59E391" : "white"
  }
  return (
      <button 
        style={styles} 
        onClick={() => holdDice(id)}
        aria-pressed={isHeld}
        aria-label={`This die has a value of ${value} and is, ${isHeld ? "held" : "not held"}`}
      >
        {value}
        </button>
  )
}