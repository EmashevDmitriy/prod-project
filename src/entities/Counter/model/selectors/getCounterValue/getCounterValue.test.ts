import { StateScheme } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';
import { DeepPartial } from 'ts-essentials';

describe('getCounterValue.test', () => {
	test('should return counter value', () => {
		const state: DeepPartial<StateScheme> = {
			counter: { value: 10 },
		};
		expect(getCounterValue(state as StateScheme)).toEqual(10);
	});
});
