import { render, screen } from '@testing-library/react';
import ScoresList from '../ScoresList';

describe('unit tests for component: ScoresList', () => {

    test('test properly accepting data via props and rendering name and score onto screen', () => {
        render(<ScoresList scores={[
            {Turns: 1, Name: "testName1", id: "testId1"},
            {Turns: 2, Name: "testName2", id: "testId2"}
        ]} />);

        const testName = screen.getByText('testName1');
        expect(testName).toBeInTheDocument();
        const testTurns = screen.getByText('1');
        expect(testTurns).toBeInTheDocument();
    });

})