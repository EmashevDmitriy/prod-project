import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './ArticleDetails.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback, useEffect } from 'react';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
	getArticleData,
	getArticleError,
	getArticleIsLoading,
} from '../../model/selectors/getArticleDetails';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
	className?: string;
	id: string;
}

const initialReducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();

	const article = useSelector(getArticleData);
	const isLoading = useSelector(getArticleIsLoading);
	const error = useSelector(getArticleError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.CODE:
				return (
					<ArticleCodeBlockComponent
						key={block.id}
						block={block}
						className={cls.block}
					/>
				);
			case ArticleBlockType.IMAGE:
				return (
					<ArticleImageBlockComponent
						key={block.id}
						block={block}
						className={cls.block}
					/>
				);
			case ArticleBlockType.TEXT:
				return (
					<ArticleTextBlockComponent
						key={block.id}
						block={block}
						className={cls.block}
					/>
				);
			default:
				return null;
		}
	}, []);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;
	if (isLoading) {
		content = (
			<div>
				<Skeleton
					className={cls.avatar}
					height={200}
					width={200}
					border={'50%'}
				/>
				<Skeleton className={cls.title} height={32} width={300} />
				<Skeleton className={cls.skeleton} height={24} width={600} />
				<Skeleton className={cls.skeleton} height={200} width="100%" />
				<Skeleton className={cls.skeleton} height={200} width="100%" />
			</div>
		);
	} else if (error) {
		content = (
			<Text
				align={TextAlign.CENTER}
				title={t('Произошла ошибка при загрузке статьи')}
			/>
		);
	} else {
		content = (
			<>
				<div className={cls.avatarWrapper}>
					<Avatar size={200} src={article?.img} className={cls.avatar} />
				</div>
				<Text
					className={cls.title}
					title={article?.title}
					description={article?.subtitle}
					size={TextSize.L}
				/>
				<div className={cls.articleInfo}>
					<Icon Svg={EyeIcon} className={cls.icon} />
					<Text description={String(article?.views)} />
				</div>
				<div className={cls.articleInfo}>
					<Icon Svg={CalendarIcon} className={cls.icon} />
					<Text description={article?.createdAt} />
				</div>
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<div className={classNames(cls.ArticleDetails, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	);
});
