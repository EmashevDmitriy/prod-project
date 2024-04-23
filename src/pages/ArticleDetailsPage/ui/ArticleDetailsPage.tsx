import cls from './ArticleDetailsPage.module.scss';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { CommentList } from 'entities/Comment';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	articleDetailsCommentsReducer,
	getArticleComments,
} from '../model/slices/articleDetailsCommentSlice';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddNewComment } from 'features/addNewComment';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RouterPath } from 'shared/config/configRouter/routeConfig';
import { Page } from 'widgets/Page/Page';

interface ArticleDetailsPageProps {
	className?: string;
}

const initialReducer: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const navigate = useNavigate();

	const onBackToList = useCallback(() => {
		navigate(RouterPath.articles);
	}, [navigate]);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch],
	);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
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
				<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
					{t('Назад к списку')}
				</Button>
				<ArticleDetails id={id} />
				<Text className={cls.commentTitle} title={t('Комментарии')} />
				<AddNewComment onSendComment={onSendComment} />
				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
