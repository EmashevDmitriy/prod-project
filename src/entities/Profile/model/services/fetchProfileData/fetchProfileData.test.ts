import { Country } from 'entities/Country';
import { fetchProfileData } from './fetchProfileData';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { Currency } from 'entities/Currency';

const data = {
	firstName: 'Ivan',
	lastName: 'Ivanov',
	age: 22,
	username: 'admin',
	country: Country.Russia,
	currency: Currency.RUB,
	city: 'Moscow',
};

describe('fetchProfileData', () => {
	test('fetch profile data success', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ data }));

		const result = await thunk.callThunk('1');

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('return status 403', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk('1');

		expect(result.meta.requestStatus).toBe('rejected');
	});
});
