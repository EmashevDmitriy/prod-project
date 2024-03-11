import { DeepPartial } from 'ts-essentials';
import { getLoginError } from './getLoginError';
import { StateScheme } from 'app/providers/StoreProvider';

describe('getLoginError', () => {
	test('should return error', () => {
		const state: DeepPartial<StateScheme> = {
			loginForm: {
				error: 'error',
			},
		};
		expect(getLoginError(state as StateScheme)).toEqual('error');
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getLoginError(state as StateScheme)).toEqual(undefined);
	});
});
