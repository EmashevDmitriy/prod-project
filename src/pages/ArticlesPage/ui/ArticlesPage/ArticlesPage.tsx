import cls from './ArticlesPage.module.scss';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles,
} from '../../model/slices/articlesPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import {
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { ArticleViewSelector } from 'features/viewSelector';
import { ArticleView } from 'entities/Article';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

interface ArticlesPageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const view = useSelector(getArticlesPageView);
	const isLoading = useSelector(getArticlesPageIsLoading);

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(initArticlesPage());
	});

	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch],
	);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
			<Page
				onScrollEnd={onLoadNextPart}
				className={classNames(cls.ArticlesPage, {}, [className])}
			>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
				<ArticleList isLoading={isLoading} view={view} articles={articles} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
