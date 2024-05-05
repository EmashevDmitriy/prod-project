import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
	test('with one param', () => {
		const params = getQueryParams({
			test: 'value',
		});
		expect(params).toBe('?test=value');
	});

	test('with multiply params', () => {
		const params = getQueryParams({
			test: 'value',
			search: 'someValue',
		});
		expect(params).toBe('?test=value&search=someValue');
	});

	test('with undefined', () => {
		const params = getQueryParams({
			test: 'value',
			search: undefined,
		});
		expect(params).toBe('?test=value');
	});
});
