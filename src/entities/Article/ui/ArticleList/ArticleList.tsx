import cls from './ArticleList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { ArticlesPageFilters } from 'pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
	onLoadNextPart?: () => void;
}

const Header = () => <ArticlesPageFilters />;

const getSkeletons = (view: ArticleView) =>
	new Array(view === ArticleView.LIST ? 9 : 3)
		.fill(0)
		.map((_, index) => (
			<ArticleListItemSkeleton className={cls.card} key={index} view={view} />
		));

export const ArticleList = memo(
	({
		className,
		articles,
		view = ArticleView.LIST,
		isLoading,
		target,
		onLoadNextPart,
	}: ArticleListProps) => {
		const { t } = useTranslation();

		const renderArticle = (article: Article) => (
			<ArticleListItem
				article={article}
				view={view}
				className={cls.card}
				key={article.id}
				target={target}
			/>
		);

		const Footer = memo(() => {
			if (isLoading) {
				return <div className={cls.articlesList}>{getSkeletons(view)}</div>;
			}
			return <div className={cls.footer}></div>;
		});

		if (!isLoading && !articles.length) {
			return (
				<div className={classNames('', {}, [className, cls[view]])}>
					<Text size={TextSize.L} title={t('Статьи не найдены')} />
				</div>
			);
		}

		return (
			<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
				{view === ArticleView.PLATE ? (
					<Virtuoso
						style={{ height: '100%' }}
						data={articles}
						itemContent={(_, article) => renderArticle(article)}
						endReached={onLoadNextPart}
						components={{ Header, Footer }}
					/>
				) : (
					<VirtuosoGrid
						listClassName={cls.itemsWrapper}
						style={{ height: '100%' }}
						data={articles}
						itemContent={(_, article) => renderArticle(article)}
						endReached={onLoadNextPart}
						components={{ Header, Footer }}
					/>
				)}
			</div>
			// <div className={classNames('', {}, [className, cls[view]])}>
			// 	{articles.length > 0 ? articles.map(renderArticle) : null}
			// 	{isLoading && getSkeletons(view)}
			// </div>
		);
	},
);
