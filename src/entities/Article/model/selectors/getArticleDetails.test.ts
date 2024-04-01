import { DeepPartial } from 'ts-essentials';
import {
	getArticleData,
	getArticleError,
	getArticleIsLoading,
} from './getArticleDetails';
import { StateScheme } from 'app/providers/StoreProvider';

describe('getArticleDetails', () => {
	test('should return data', () => {
		const data = {
			id: '1',
			title: 'subtitle',
		};
		const state: DeepPartial<StateScheme> = {
			articleDetails: {
				data,
			},
		};
		expect(getArticleData(state as StateScheme)).toEqual(data);
	});

	test('should work with empty state data', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getArticleData(state as StateScheme)).toEqual(undefined);
	});

	test('should return isLoading', () => {
		const state: DeepPartial<StateScheme> = {
			articleDetails: {
				isLoading: true,
			},
		};
		expect(getArticleIsLoading(state as StateScheme)).toEqual(true);
	});

	test('should work with empty state isLoading', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getArticleIsLoading(state as StateScheme)).toEqual(false);
	});

	test('should return error', () => {
		const state: DeepPartial<StateScheme> = {
			articleDetails: {
				error: '123',
			},
		};
		expect(getArticleError(state as StateScheme)).toEqual('123');
	});

	test('should work with empty state error', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getArticleError(state as StateScheme)).toEqual(undefined);
	});
});
