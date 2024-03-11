import { DeepPartial } from 'ts-essentials';
import { LoginScheme } from '../types/LoginScheme';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
	test('test set username', () => {
		const state: DeepPartial<LoginScheme> = { username: '123' };
		expect(
			loginReducer(state as LoginScheme, loginActions.setUsername('123456')),
		).toEqual({ username: '123456' });
	});

	test('test set password', () => {
		const state: DeepPartial<LoginScheme> = { password: '123' };
		expect(
			loginReducer(state as LoginScheme, loginActions.setPassword('123456')),
		).toEqual({ password: '123456' });
	});
});
