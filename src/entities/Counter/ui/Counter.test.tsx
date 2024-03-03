import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
	test('render counter', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		expect(screen.getByTestId('value-title')).toHaveTextContent('10');
	});

	test('increment btn', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		fireEvent.click(screen.getByTestId('increment'));
		expect(screen.getByTestId('value-title')).toHaveTextContent('11');
	});

	test('decrement btn', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		fireEvent.click(screen.getByTestId('decrement'));
		expect(screen.getByTestId('value-title')).toHaveTextContent('9');
	});
});
