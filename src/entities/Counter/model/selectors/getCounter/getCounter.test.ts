import { StateScheme } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';
import { DeepPartial } from 'ts-essentials';

describe('getCounter', () => {
	test('should return counter value', () => {
		const state: DeepPartial<StateScheme> = {
			counter: { value: 10 },
		};
		expect(getCounter(state as StateScheme)).toEqual({ value: 10 });
	});
});
