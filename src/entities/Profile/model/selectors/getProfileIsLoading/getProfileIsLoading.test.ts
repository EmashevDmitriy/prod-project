import { DeepPartial } from 'ts-essentials';
import { getProfileIsLoading } from './getProfileIsLoading';
import { StateScheme } from 'app/providers/StoreProvider';

describe('getProfileIsLoading', () => {
	test('should return loading true', () => {
		const state: DeepPartial<StateScheme> = {
			profile: {
				isLoading: true,
			},
		};
		expect(getProfileIsLoading(state as StateScheme)).toEqual(true);
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileIsLoading(state as StateScheme)).toEqual(undefined);
	});
});
