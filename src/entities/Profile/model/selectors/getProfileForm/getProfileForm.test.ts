import { DeepPartial } from 'ts-essentials';
import { getProfileForm } from './getProfileForm';
import { StateScheme } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

describe('getProfileForm', () => {
	test('should return form data', () => {
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
				form: data,
			},
		};
		expect(getProfileForm(state as StateScheme)).toEqual(data);
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileForm(state as StateScheme)).toEqual(undefined);
	});
});
