import { StateScheme } from 'app/providers/StoreProvider';
import { DeepPartial } from 'ts-essentials';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
	test('should return username', () => {
		const state: DeepPartial<StateScheme> = {
			loginForm: {
				username: 'admin123',
			},
		};
		expect(getLoginUsername(state as StateScheme)).toEqual('admin123');
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getLoginUsername(state as StateScheme)).toEqual('');
	});
});
