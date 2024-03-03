import { StateScheme } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue.test', () => {
	test('should return counter value', () => {
		const state: StateScheme = {
			counter: { value: 10 },
		};
		expect(getCounterValue(state as StateScheme)).toEqual(10);
	});
});
