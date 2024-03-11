import { DeepPartial } from 'ts-essentials';
import { getLoginPassword } from './getLoginPassword';
import { StateScheme } from 'app/providers/StoreProvider';

describe('getLoginPassword', () => {
	test('should return password', () => {
		const state: DeepPartial<StateScheme> = {
			loginForm: {
				password: '123456',
			},
		};
		expect(getLoginPassword(state as StateScheme)).toEqual('123456');
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getLoginPassword(state as StateScheme)).toEqual('');
	});
});
