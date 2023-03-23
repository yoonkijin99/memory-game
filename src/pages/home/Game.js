import { useEffect, useState } from 'react';

import Board from './Board';
import './Game.css';

import { addDoc } from 'firebase/firestore'
import colRef from '../../firebase-config';


const cardsInitialState = [
  {'src': '/img/donut.jpg', matched: false},
  {'src': '/img/bear.jpg', matched: false},
  {'src': '/img/hotdog.jpg', matched: false},
  {'src': '/img/astronaut.jpg', matched: false},
  {'src': '/img/koala.jpg', matched: false},
  {'src': '/img/cat.jpg', matched: false},
  {'src': '/img/monkey.jpg', matched: false},
  {'src': '/img/cow.jpg', matched: false},

  {'src': '/img/donut2.jpg', matched: false},
  {'src': '/img/bear2.jpg', matched: false},
  {'src': '/img/hotdog2.jpg', matched: false},
  {'src': '/img/astronaut2.jpg', matched: false},
  {'src': '/img/koala2.jpg', matched: false},
  {'src': '/img/cat2.jpg', matched: false},
  {'src': '/img/monkey2.jpg', matched: false},
  {'src': '/img/cow2.jpg', matched: false}
]

let pairsLeft = 6; 

function Game() {

  const [cards, setCards] = useState([]);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [gameFinished, setGameFinished] = useState(false);

  const [clickDisabled, setClickDisabled] = useState(false);

  const [turnsTaken, setTurnsTaken] = useState(0);

  const [playerName, setPlayerName] = useState('');

  const startNewGame = () => {
    setGameFinished(false);

    setPlayerName('');

    pairsLeft = 8;

    setTurnsTaken(0);

    shuffleCards();
  }

  const shuffleCards = () => {
    const shuffledCards = [...cardsInitialState].sort(() => Math.random() - 0.5).map((card, index) => ({...card, id: index}));
    
    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
  }

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setClickDisabled(true);

      if (choiceOne.src.replace('2', '') === choiceTwo.src.replace('2', '')) {
        setCards(prevCards => { 
          return prevCards.map(
            card => {
              if (card.src === choiceOne.src || card.src === choiceTwo.src) {
                return {...card, matched: true}; 
              } else {
                return card;
              }
            }
          )
        })

        resetTurn();

        pairsLeft -= 1;
        if (pairsLeft === 0) {
          setGameFinished(true);
        }

      } else {
        setTimeout(() => resetTurn(), 750); 
      }

    }
  }, [choiceOne, choiceTwo]);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    setTurnsTaken(prevTurns => prevTurns + 1);

    setClickDisabled(false);
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleSubmit = (eventObj) => {

    eventObj.preventDefault();

    if (gameFinished) {
      addDoc(colRef, {
          Name: playerName,
          Turns: turnsTaken
      }); 
      startNewGame();
    }

  }

  return (
    <div className='game-frame'>

      <button className='new-game-button' onClick={startNewGame}>New Game</button>

      <Board cards={cards} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} clickDisabled={clickDisabled} />
      
      <p className='turns'>Turns: {turnsTaken}</p>

      <div>
          <form className='score-form' onSubmit={handleSubmit}>
            <label className='name'>Name:</label>
            <input className='name-input' type='text' required value={playerName} onChange={(eventObj) => setPlayerName(eventObj.target.value)} />
            <button className='submit-button'>Submit Score</button>
          </form>
      </div>

    </div>
  );
}

export default Game;
