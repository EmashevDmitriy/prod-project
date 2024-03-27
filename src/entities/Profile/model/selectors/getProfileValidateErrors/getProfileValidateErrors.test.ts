import { DeepPartial } from 'ts-essentials';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { StateScheme } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile';

describe('getProfileValidateErrors', () => {
	test('should return validateErrors true', () => {
		const state: DeepPartial<StateScheme> = {
			profile: {
				validateErrors: [
					ValidateProfileError.SERVER_ERROR,
					ValidateProfileError.NO_DATA,
				],
			},
		};
		expect(getProfileValidateErrors(state as StateScheme)).toEqual([
			ValidateProfileError.SERVER_ERROR,
			ValidateProfileError.NO_DATA,
		]);
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileValidateErrors(state as StateScheme)).toEqual(undefined);
	});
});
