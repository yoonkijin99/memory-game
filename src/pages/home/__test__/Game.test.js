import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../Game';


describe('unit/integration tests for component: Game', () => {

    describe('tests for input element (for entering user name)', () => {

        test('input element value should be what user enters', () => {
            render(<Game />);
    
            const nameInput = screen.getByRole('textbox');
            fireEvent.change(nameInput, { target: { value: 'testName' } });
    
            expect(nameInput.value).toBe('testName');
        });
        
        test('input element text should be empty after clicking new game button', () => {
            render(<Game />);
    
            const nameInput = screen.getByRole('textbox'); 
            fireEvent.change(nameInput, { target: { value: 'testName' } });
    
            const newGameButton = screen.getByRole('button', { name: 'New Game' });
            fireEvent.click(newGameButton);
    
            expect(nameInput.value).toBe('');
        });
    
        test('input element text should be the same after clicking submit score button if game not finished', async () => {
            render(<Game />);
    
            const nameInput = screen.getByRole('textbox'); 
            fireEvent.change(nameInput, { target: { value: 'testName' } });
    
            const submitButton = screen.getByRole('button', { name: 'Submit Score' });
            fireEvent.click(submitButton);
    
            expect(nameInput.value).toBe('testName');
        });

    })

    describe('tests for clicking cards', () => {
                
        test('2 clicks(cards) -> 2 flipped cards', () => {
            render(<Game />);

            const backImgElementsArray = screen.getAllByTestId('card-back');

            fireEvent.click(backImgElementsArray[0]);
            fireEvent.click(backImgElementsArray[1]);

            const clickedImgElementsArray = screen.getAllByTestId('clicked');
            expect(clickedImgElementsArray.length).toBe(2);
        });

        test('2 clicks(cards) -> new game button click -> result should be: 0 flipped cards(16 not flipped ards)', () => {
            render(<Game />);

            const backImgElementsArray = screen.getAllByTestId('card-back');

            fireEvent.click(backImgElementsArray[0]);
            fireEvent.click(backImgElementsArray[1]);

            let clickedImgElementsArray = screen.getAllByTestId('clicked');
            expect(clickedImgElementsArray.length).toBe(2);

            const buttonElement = screen.getByRole('button', { name: 'New Game' });
            fireEvent.click(buttonElement);

            clickedImgElementsArray = screen.getAllByTestId('not-clicked');
            expect(clickedImgElementsArray.length).toBe(16);
        });

        test('initial component render should render   Turns: 0', () => {
            render(<Game />);

            const turnsText = screen.getByText('Turns: 0');
            expect(turnsText).toBeInTheDocument();
        });

        test('2 clicks(cards) should render   Turns: 1', async () => {
            render(<Game />);

            const backImgElementsArray = screen.getAllByTestId('card-back');

            fireEvent.click(backImgElementsArray[0]);
            fireEvent.click(backImgElementsArray[1]);

            const turnsText = await screen.findByText('Turns: 1');
            expect(turnsText).toBeInTheDocument();
        });

        test('4 clicks(cards) should render   Turns: 2', async () => {
            render(<Game />);

            const backImgElementsArray = screen.getAllByTestId('card-back');

            fireEvent.click(backImgElementsArray[0]);
            fireEvent.click(backImgElementsArray[1]);

            let turnsText = await screen.findByText('Turns: 1');
            expect(turnsText).toBeInTheDocument();

            fireEvent.click(backImgElementsArray[2]);
            fireEvent.click(backImgElementsArray[3]);

            turnsText = await screen.findByText('Turns: 2');
            expect(turnsText).toBeInTheDocument();
        });

        test('2 clicks(cards) -> new game button click -> result should be: should render   Turns: 0', async () => {
            render(<Game />);

            const backImgElementsArray = screen.getAllByTestId('card-back');

            fireEvent.click(backImgElementsArray[0]);
            fireEvent.click(backImgElementsArray[1]);

            let turnsText = await screen.findByText('Turns: 1');
            expect(turnsText).toBeInTheDocument();

            const newGameButton = screen.getByRole('button', { name: 'New Game' });
            fireEvent.click(newGameButton);

            
            turnsText = screen.getByText('Turns: 0');
            expect(turnsText).toBeInTheDocument();
        });

    })

    describe('tests to check for proper basic rendering', () => {

        test('Should have two buttons rendered - new game button & submit score button', () => {
            render(<Game />);
    
            const newGameButton = screen.getByRole('button', { name: 'New Game' });
            expect(newGameButton).toBeInTheDocument();
            
            const submitScoreButton = screen.getByRole('button', { name: 'Submit Score' });
            expect(submitScoreButton).toBeInTheDocument();
        });
        
        test('should have 32 img elements rendered total', () => {
            render(<Game />);
            
            const backImgElementsArray = screen.getAllByRole('img');
            expect(backImgElementsArray.length).toBe(32); 
        });
    
        test('should have 16 front cards 16 back cards rendered', () => {
            render(<Game />);
    
            const imgCardCoverElementsArray = screen.getAllByTestId('card-back'); 
            const imgCardFrontElementsArray = screen.getAllByTestId('card-front');
    
            expect(imgCardCoverElementsArray.length).toBe(16);
            expect(imgCardFrontElementsArray.length).toBe(16);
        });
    })

})






