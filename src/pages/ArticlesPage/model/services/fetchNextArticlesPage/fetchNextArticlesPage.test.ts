import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage', () => {
	test('fetch next articles page data success', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: true,
			},
		});
		await thunk.callThunk();
		expect(thunk.dispatch).toHaveBeenCalledTimes(4);
		expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
	});

	test('fetch article list not called', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: false,
			},
		});
		await thunk.callThunk();
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(fetchArticlesList).not.toHaveBeenCalledWith();
	});

	test('fetch article list loading', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: true,
				hasMore: true,
			},
		});
		await thunk.callThunk();
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(fetchArticlesList).not.toHaveBeenCalledWith();
	});
});
