import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageScheme } from '../types/articlesPageScheme';
import { fetchArticlesPage } from '../services/fetchArticlesList/fetchArticlesList';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const articlesAdapter = createEntityAdapter<Article, string>({
	selectId: article => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateScheme>(
	state => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageScheme>({
		isLoading: false,
		error: undefined,
		ids: ['1', '2'],
		entities: {},
		view: ArticleView.LIST,
	}),
	reducers: {
		setView(state, action: PayloadAction<ArticleView>) {
			state.view = action.payload;
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		initState(state) {
			state.view = localStorage.getItem(
				ARTICLES_VIEW_LOCALSTORAGE_KEY,
			) as ArticleView;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchArticlesPage.pending, state => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchArticlesPage.fulfilled,
				(state, action: PayloadAction<Article[]>) => {
					state.isLoading = false;
					articlesAdapter.setAll(state, action.payload);
				},
			)
			.addCase(fetchArticlesPage.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
	articlesPageSlice;
