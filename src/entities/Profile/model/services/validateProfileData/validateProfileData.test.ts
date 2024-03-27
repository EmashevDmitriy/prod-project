import { Country } from 'entities/Country';
import { validateProfileData } from './validateProfileData';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from '../../types/profile';

const data = {
	firstName: 'Ivan',
	lastName: 'Ivanov',
	age: 22,
	username: 'admin',
	country: Country.Russia,
	currency: Currency.RUB,
	city: 'Moscow',
};

describe('validateProfileData', () => {
	test('validate without errors', () => {
		const result = validateProfileData(data);
		expect(result).toEqual([]);
	});

	test('without first and last name', () => {
		const result = validateProfileData({
			...data,
			firstName: '',
			lastName: '',
		});
		expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
	});

	test('without age', () => {
		const result = validateProfileData({
			...data,
			age: 0,
		});
		expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
	});

	test('without city', () => {
		const result = validateProfileData({
			...data,
			city: '',
		});
		expect(result).toEqual([ValidateProfileError.INCORRECT_CITY]);
	});

	test('incorrect all', () => {
		const result = validateProfileData({});
		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_CITY,
			ValidateProfileError.INCORRECT_AGE,
		]);
	});
});
