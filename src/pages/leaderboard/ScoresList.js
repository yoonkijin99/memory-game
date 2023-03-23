import './ScoresList.css';

const ScoresList = ({scores}) => {
    return (
        <div>
            {scores.map(score => (
                <div className='scores' key={score.id}>
                    <p>{score.Name}</p>
                    <p>{score.Turns}</p>
                </div>
            ))}
        </div>
     );
}
 
export default ScoresList;