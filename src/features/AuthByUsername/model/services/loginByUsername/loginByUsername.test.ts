import axios from 'axios';
import { loginByUsername } from './loginByUsername';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('loginByUsername', () => {
	// let dispatch: Dispatch;
	// let getState: () => StateScheme;

	// beforeEach(() => {
	// 	dispatch = jest.fn();
	// 	getState = jest.fn();
	// });

	// test('login success', async () => {
	// 	const userValue = { username: 'admin', id: '1' };
	// 	mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
	// 	const action = loginByUsername({ username: 'admin', password: '123' });
	// 	const result = await action(dispatch, getState, undefined);

	// 	expect(dispatch).toHaveBeenCalledTimes(3);
	// 	expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
	// 	expect(mockedAxios.post).toHaveBeenCalled();
	// 	expect(result.meta.requestStatus).toBe('fulfilled');
	// 	expect(result.payload).toBe(userValue);
	// });

	test('login success', async () => {
		const userValue = { username: 'admin', id: '1' };
		mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

		const thunk = new TestAsyncThunk(loginByUsername);
		const result = await thunk.callThunk({ username: '123', password: '123' });

		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(thunk.dispatch).toHaveBeenCalledWith(
			userActions.setAuthData(userValue),
		);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toBe(userValue);
	});

	test('return status 403', async () => {
		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
		const thunk = new TestAsyncThunk(loginByUsername);
		const result = await thunk.callThunk({ username: '123', password: '123' });

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe('error');
	});
});
