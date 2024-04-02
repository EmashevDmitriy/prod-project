import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleDetailsCommentScheme } from '../types/ArticleDetailsCommentScheme';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const commentsAdapter = createEntityAdapter<Comment, string>({
	selectId: comment => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateScheme>(
	state => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentSlice = createSlice({
	name: 'articleDetailsCommentSlice',
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentScheme>({
		isLoading: false,
		error: undefined,
		ids: ['1', '2'],
		entities: {},
	}),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCommentsByArticleId.pending, state => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchCommentsByArticleId.fulfilled,
				(state, action: PayloadAction<Comment[]>) => {
					state.isLoading = false;
					commentsAdapter.setAll(state, action.payload);
				},
			)
			.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articleDetailsCommentsReducer } =
	articleDetailsCommentSlice;
