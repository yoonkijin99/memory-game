import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('unit tests for component: Card', () => {

    const mockSendChoice = jest.fn()

    test('test card dynamic class depending on click/not clicked', () => {
        render(<Card card={{'src': '/img/donut.jpg'}} sendChoice={mockSendChoice} flipped={false} clickDisabled={null} />);

        const divElement = screen.getByTestId('not-clicked');
        expect(divElement).toHaveClass('not-flipped');
    });

    test('test card dynamic class depending on click/not clicked', () => {
        render(<Card card={{'src': '/img/donut.jpg'}} sendChoice={mockSendChoice} flipped={true} clickDisabled={null} />);

        const divElement = screen.getByTestId('clicked');
        expect(divElement).toHaveClass('flipped');
    });

})