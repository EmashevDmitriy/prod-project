import { DeepPartial } from 'ts-essentials';
import { getLoginIsLoading } from './getLoginIsLoading';
import { StateScheme } from 'app/providers/StoreProvider';

describe('getLoginIsLoading', () => {
	test('should return true', () => {
		const state: DeepPartial<StateScheme> = {
			loginForm: {
				isLoading: true,
			},
		};
		expect(getLoginIsLoading(state as StateScheme)).toEqual(true);
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getLoginIsLoading(state as StateScheme)).toEqual(false);
	});
});
