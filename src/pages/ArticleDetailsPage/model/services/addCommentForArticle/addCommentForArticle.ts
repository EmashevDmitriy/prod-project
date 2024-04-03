import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateScheme';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleData } from 'entities/Article';
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
	Comment,
	string,
	ThunkConfig<string>
>('article/addCommentForArticle', async (text, thunkApi) => {
	const { extra, dispatch, rejectWithValue, getState } = thunkApi;

	const userData = getUserAuthData(getState());
	const article = getArticleData(getState());

	if (!userData || !text || !article) {
		return rejectWithValue('no data');
	}

	try {
		const response = await extra.api.post<Comment>('/comments', {
			articleId: article.id,
			userId: userData.id,
			text,
		});
		if (!response.data) {
			throw new Error();
		}

		dispatch(fetchCommentsByArticleId(article.id));

		return response.data;
	} catch (error) {
		return rejectWithValue('error');
	}
});
