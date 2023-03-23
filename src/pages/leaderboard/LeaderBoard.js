import { useEffect, useState } from 'react';

import ScoresList from './ScoresList';

import { getDocs } from 'firebase/firestore'
import colRef from '../../firebase-config';

const LeaderBoard = () => {

    const [scores, setScores] = useState([]);

    const getScores = () => {
        getDocs(colRef)
        .then((snapshot) => {
            let scoresArray = [];
            snapshot.docs.forEach((doc) => {
                scoresArray.push({ ...doc.data(), id: doc.id }) 
            })

            scoresArray.sort((score1, score2) => (score1.Turns > score2.Turns) ? 1 : -1);

            setScores(scoresArray);
        }).catch(err => {
            console.log(err.message);
        })        
    }
    
    useEffect(() => {
        getScores();
    }, []);

    return ( 
        <div>
            {<ScoresList scores={scores} />}
        </div>
     );
}
 
export default LeaderBoard;