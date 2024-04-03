import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export enum ValidateProfileError {
	INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
	INCORRECT_CITY = 'INCORRECT_CITY',
	INCORRECT_AGE = 'INCORRECT_AGE',
	SERVER_ERROR = 'SERVER_ERROR',
	NO_DATA = 'NO_DATA',
}

export interface Profile {
	id?: string;
	firstName?: string;
	lastName?: string;
	age?: number;
	currency?: Currency;
	country?: Country;
	city?: string;
	username?: string;
	avatar?: string;
}

export interface ProfileScheme {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	validateErrors?: ValidateProfileError[];
}
