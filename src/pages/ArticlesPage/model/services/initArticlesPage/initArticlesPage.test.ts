import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { initArticlesPage } from './initArticlesPage';

describe('initArticlesPage', () => {
	test('init articles before inited', async () => {
		const searchParams = new URLSearchParams({
			order: '',
			sort: '',
			search: '',
		});

		const thunk = new TestAsyncThunk(initArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: true,
				_inited: false,
			},
		});
		await thunk.callThunk(searchParams);
		expect(thunk.dispatch).toHaveBeenCalledTimes(4);
	});

	test('init articles after inited', async () => {
		const searchParams = new URLSearchParams({
			order: '',
			sort: '',
			search: '',
		});

		const thunk = new TestAsyncThunk(initArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: true,
				_inited: true,
			},
		});
		await thunk.callThunk(searchParams);
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
	});
});
