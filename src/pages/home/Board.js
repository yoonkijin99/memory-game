import Card from "./Card";
import './Board.css';

const Board = ({cards, handleChoice, choiceOne, choiceTwo, clickDisabled}) => {

  const sendChoice = (card) => {
    handleChoice(card);
  }

    return ( 
        <div className='card-grid'>
          {cards.map(card => (
              <Card 
              key={card.id} 
              card={card} 
              sendChoice={sendChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              clickDisabled={clickDisabled}
              />
          ))}
        </div>
    );
}
 
export default Board;