import { DeepPartial } from 'ts-essentials';
import { getProfileError } from './getProfileError';
import { StateScheme } from 'app/providers/StoreProvider';

describe('getProfileError', () => {
	test('should return error', () => {
		const state: DeepPartial<StateScheme> = {
			profile: {
				error: '123',
			},
		};
		expect(getProfileError(state as StateScheme)).toEqual('123');
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileError(state as StateScheme)).toEqual(undefined);
	});
});
