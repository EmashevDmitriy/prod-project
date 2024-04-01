import { StateScheme } from 'app/providers/StoreProvider';

export const getArticleData = (state: StateScheme) =>
	state.articleDetails?.data;
export const getArticleIsLoading = (state: StateScheme) =>
	state.articleDetails?.isLoading || false;
export const getArticleError = (state: StateScheme) =>
	state.articleDetails?.error;
