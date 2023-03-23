import './Card.css'

const Card = ({ card, sendChoice, flipped, clickDisabled }) => {

    const handleClick = () => {
        if (!clickDisabled) {
            sendChoice(card);
        }
    }

    return ( 
        <div className='card'>
            <div className={flipped ? 'flipped' : 'not-flipped'} data-testid={flipped ? 'clicked' : 'not-clicked'}>
                <img  className='front' src={card.src} data-testid='card-front'/>
                <img  className='back' src='/img/back.jpg' onClick={handleClick} data-testid='card-back'/>
            </div>
        </div>
     );
}
 
export default Card;