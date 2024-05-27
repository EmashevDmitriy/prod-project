import cls from './ArticleDetailsPage.module.scss';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { CommentList } from 'entities/Comment';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';
import { getArticleRecommendations } from '../../model/slices/articleDetailsRecommendationsSlice';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddNewComment } from 'features/addNewComment';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { Page } from 'widgets/Page/Page';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from 'shared/ui/Stack';

interface ArticleDetailsPageProps {
	className?: string;
}

const initialReducer: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const recommendation = useSelector(getArticleRecommendations.selectAll);
	const recommendationIsLoading = useSelector(
		getArticleRecommendationsIsLoading,
	);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch],
	);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	});

	if (!id) {
		return (
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{t('Что-то пошло не так')}
			</Page>
		);
	}

	return (
		<DynamicModuleLoader reducers={initialReducer} removeAfterUnmount={true}>
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				<VStack gap="16" max>
					<ArticleDetailsPageHeader />
					<ArticleDetails id={id} />
					<Text
						size={TextSize.L}
						className={cls.commentTitle}
						title={t('Рекомендации')}
					/>
					<ArticleList
						articles={recommendation}
						isLoading={recommendationIsLoading}
						className={cls.recommendations}
						target="_blank"
					/>
					<Text
						size={TextSize.L}
						className={cls.commentTitle}
						title={t('Комментарии')}
					/>
					<AddNewComment onSendComment={onSendComment} />
					<CommentList isLoading={commentsIsLoading} comments={comments} />
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
