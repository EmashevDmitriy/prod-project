import { DeepPartial } from 'ts-essentials';
import { getProfileData } from './getProfileData';
import { StateScheme } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

describe('getProfileData', () => {
	test('should return data', () => {
		const data = {
			firstName: 'Ivan',
			lastName: 'Ivanov',
			age: 22,
			username: 'admin',
			country: Country.Russia,
			currency: Currency.RUB,
			city: 'Moscow',
		};
		const state: DeepPartial<StateScheme> = {
			profile: {
				data,
			},
		};
		expect(getProfileData(state as StateScheme)).toEqual(data);
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileData(state as StateScheme)).toEqual(undefined);
	});
});
