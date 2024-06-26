import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './ArticleDetails.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback } from 'react';
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
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack, VStack } from 'shared/ui/Stack';

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
						className={cls.blockImg}
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

	useInitialEffect(() => {
		dispatch(fetchArticleById(id));
	});

	let content;
	if (isLoading) {
		content = (
			<>
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
			</>
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
				<HStack justify="center" max>
					<Avatar size={200} src={article?.img} className={cls.avatar} />
				</HStack>
				<VStack gap="4" max>
					<Text
						className={cls.title}
						title={article?.title}
						description={article?.subtitle}
						size={TextSize.L}
					/>
					<HStack gap="8">
						<Icon Svg={EyeIcon} className={cls.icon} />
						<Text description={String(article?.views)} />
					</HStack>
					<HStack gap="8">
						<Icon Svg={CalendarIcon} className={cls.icon} />
						<Text description={article?.createdAt} />
					</HStack>
				</VStack>
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<VStack
				max
				gap="16"
				className={classNames(cls.ArticleDetails, {}, [className])}
			>
				{content}
			</VStack>
		</DynamicModuleLoader>
	);
});
