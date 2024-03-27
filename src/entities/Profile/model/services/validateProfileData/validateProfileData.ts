import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
	if (!profile) {
		return [ValidateProfileError.NO_DATA];
	}

	const { firstName, lastName, city, age } = profile;
	const errors: ValidateProfileError[] = [];

	if (!firstName || !lastName) {
		errors.push(ValidateProfileError.INCORRECT_USER_DATA);
	}

	if (!city) {
		errors.push(ValidateProfileError.INCORRECT_CITY);
	}

	if (!age || age <= 0) {
		errors.push(ValidateProfileError.INCORRECT_AGE);
	}

	return errors;
};
