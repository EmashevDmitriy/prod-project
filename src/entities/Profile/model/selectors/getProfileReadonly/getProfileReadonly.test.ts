import { DeepPartial } from 'ts-essentials';
import { getProfileReadonly } from './getProfileReadonly';
import { StateScheme } from 'app/providers/StoreProvider';

describe('getProfileReadonly', () => {
	test('should return readonly true', () => {
		const state: DeepPartial<StateScheme> = {
			profile: {
				readonly: true,
			},
		};
		expect(getProfileReadonly(state as StateScheme)).toEqual(true);
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileReadonly(state as StateScheme)).toEqual(undefined);
	});
});
