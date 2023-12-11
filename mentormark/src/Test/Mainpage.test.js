import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Mainpage from '../Mainpage';

describe('Mainpage component', () => {
    test('Mainpage renders', () => {
        render(<Mainpage />);
        
    });
});