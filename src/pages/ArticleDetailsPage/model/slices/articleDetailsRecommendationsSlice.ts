import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { ArticleDetailsRecommendationsScheme } from '../types/ArticleDetailsRecommendationsScheme';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article, string>({
	selectId: article => article.id,
});

export const getArticleRecommendations =
	recommendationsAdapter.getSelectors<StateScheme>(
		state =>
			state.articleDetailsPage?.recommendations ||
			recommendationsAdapter.getInitialState(),
	);

const articleDetailsRecommendationsSlice = createSlice({
	name: 'articleDetailsRecommendationsSlice',
	initialState:
		recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsScheme>(
			{
				isLoading: false,
				error: undefined,
				ids: [],
				entities: {},
			},
		),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchArticleRecommendations.pending, state => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
				state.isLoading = false;
				recommendationsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchArticleRecommendations.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articleDetailsRecommendationsReducer } =
	articleDetailsRecommendationsSlice;
