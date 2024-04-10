import cls from './ArticleList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
	return new Array(view === ArticleView.LIST ? 9 : 3)
		.fill(0)
		.map((item, index) => (
			<ArticleListItemSkeleton className={cls.card} key={index} view={view} />
		));
};

export const ArticleList = memo(
	({
		className,
		articles,
		isLoading,
		view = ArticleView.LIST,
	}: ArticleListProps) => {
		if (isLoading) {
			return (
				<div className={classNames('', {}, [className, cls[view]])}>
					{getSkeletons(view)}
				</div>
			);
		}

		return (
			<div className={classNames('', {}, [className, cls[view]])}>
				{articles.length > 0
					? articles.map(item => (
							<ArticleListItem
								className={cls.card}
								key={item.id}
								article={item}
								view={view}
							/>
						))
					: null}
			</div>
		);
	},
);
