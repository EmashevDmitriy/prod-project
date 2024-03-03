import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
	const dispatch = useDispatch();
	const counterValue = useSelector(getCounterValue);

	const increment = () => {
		dispatch(counterActions.increment());
	};

	const decrement = () => {
		dispatch(counterActions.decrement());
	};

	return (
		<div>
			<h2 data-testid="value-title">{counterValue}</h2>
			<Button data-testid="increment" onClick={increment}>
				{'Increment'}
			</Button>
			<Button data-testid="decrement" onClick={decrement}>
				{'Decrement'}
			</Button>
		</div>
	);
};
