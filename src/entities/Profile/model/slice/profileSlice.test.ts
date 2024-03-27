import { DeepPartial } from 'ts-essentials';
import { profileAction, profileReducer } from './profileSlice';
import { ProfileScheme, ValidateProfileError } from '../types/profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const data = {
	firstName: 'Ivan',
	lastName: 'Ivanov',
	age: 22,
	username: 'admin',
	country: Country.Russia,
	currency: Currency.RUB,
	city: 'Moscow',
};

describe('profileSlice', () => {
	test('test set readonly', () => {
		const state: DeepPartial<ProfileScheme> = { readonly: false };
		expect(
			profileReducer(state as ProfileScheme, profileAction.setReadonly(true)),
		).toEqual({ readonly: true });
	});

	test('test cancel edit', () => {
		const state: DeepPartial<ProfileScheme> = {};
		expect(
			profileReducer(state as ProfileScheme, profileAction.cancelEdit()),
		).toEqual({ readonly: true, validateErrors: undefined });
	});

	test('test update profile', () => {
		const state: DeepPartial<ProfileScheme> = {
			form: { username: '123' },
		};
		expect(
			profileReducer(
				state as ProfileScheme,
				profileAction.updateProfile({ username: '123456' }),
			),
		).toEqual({ form: { username: '123456' } });
	});

	test('test update profile service pending', () => {
		const state: DeepPartial<ProfileScheme> = {
			isLoading: false,
			validateErrors: [ValidateProfileError.SERVER_ERROR],
		};
		expect(
			profileReducer(state as ProfileScheme, updateProfileData.pending('')),
		).toEqual({
			isLoading: true,
			validateErrors: undefined,
		});
	});

	test('test update profile service fullfiled', () => {
		const state: DeepPartial<ProfileScheme> = {
			isLoading: true,
		};
		expect(
			profileReducer(
				state as ProfileScheme,
				updateProfileData.fulfilled(data, ''),
			),
		).toEqual({
			isLoading: false,
			validateErrors: undefined,
			readonly: true,
			form: data,
			data,
		});
	});
});
