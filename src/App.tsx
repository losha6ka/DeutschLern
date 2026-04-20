import './css/App.css'
import worter from '../DB/worter.json'
import { useEffect, useState } from 'react'

type Word = {
  id: number
  word: string
  translation: string
}

const App = () => {
  useEffect(() => {
    handleNextWord()
  }, [])
  const [history, setHistory] = useState<Word[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [showTranslate, setShowTranslate] = useState(false)

  const currentWord = history[activeIndex]

  const getRandomWord = (): Word => {
    const randomIndex = Math.floor(Math.random() * worter.length)
    return worter[randomIndex]
  }

  const handleNextWord = () => {
    const newWord = getRandomWord()

    const newHistory = [...history, newWord]

    setHistory(newHistory)
    setActiveIndex(newHistory.length - 1)
    setShowTranslate(false)
  }

  const handlePrevWord = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
      setShowTranslate(false)
    }
  }

  return (
    <div className='body'>
      <div className="wort-box">
        <p className="text-deutsch">{currentWord?.word}</p>
        {showTranslate && (
          <p className="text-translate">{currentWord?.translation}</p>
        )}
      </div>

      <div className="main-button-box">
        <button
          onClick={() => setShowTranslate(true)}
          className="translate-wort"
        >
          перевести слово
        </button>

        <div className='contol-box'>
          <button
            onClick={handlePrevWord}
            className="prev-wort"
            disabled={activeIndex <= 0}
          >
            предыдущее слово
          </button>

          <button
            onClick={handleNextWord}
            className="next-wort"
          >
            следующее слово
          </button>
        </div>
      </div>
    </div>
  )
}

export default App