import cls from './ArticleList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	FC,
	HTMLAttributeAnchorTarget,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import { ArticlesPageFilters } from 'pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters';
import { ARTICLE_LIST_SESSION_ITEM_ID } from 'shared/const/localstorage';

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
	new Array(3)
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
		const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);
		const [selectedArticleId, setSelectedArticleId] = useState(1);

		useEffect(() => {
			const page = sessionStorage.getItem(ARTICLE_LIST_SESSION_ITEM_ID) || 1;
			setSelectedArticleId(+page);
		}, []);

		useEffect(() => {
			let timeoutId: NodeJS.Timeout;
			if (view === ArticleView.LIST) {
				timeoutId = setTimeout(() => {
					if (virtuosoGridRef.current) {
						virtuosoGridRef.current.scrollToIndex(selectedArticleId);
					}
				}, 0);
			}

			return () => clearTimeout(timeoutId);
		}, [selectedArticleId, view]);

		const renderArticle = (article: Article) => (
			<ArticleListItem
				index={+article.id}
				article={article}
				view={view}
				className={cls.card}
				key={article.id}
				target={target}
			/>
		);

		const Footer = memo(() => {
			if (isLoading) {
				return (
					<div className={cls.articlesList}>
						{getSkeletons(ArticleView.PLATE)}
					</div>
				);
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

		const ItemContainerComp: FC<{
			index: number;
		}> = ({ index }) => {
			return (
				<div className={cls.ItemContainer}>
					<ArticleListItemSkeleton view={view} key={index} />
				</div>
			);
		};

		return (
			<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
				{view === ArticleView.PLATE ? (
					<Virtuoso
						style={{ height: '100%' }}
						data={articles}
						itemContent={(_, article) => renderArticle(article)}
						endReached={onLoadNextPart}
						components={{ Header, Footer }}
						initialTopMostItemIndex={selectedArticleId}
					/>
				) : (
					<VirtuosoGrid
						ref={virtuosoGridRef}
						listClassName={cls.itemsWrapper}
						totalCount={articles.length}
						data={articles}
						itemContent={(_, article) => renderArticle(article)}
						endReached={onLoadNextPart}
						components={{ Header, ScrollSeekPlaceholder: ItemContainerComp }}
						scrollSeekConfiguration={{
							enter: velocity => Math.abs(velocity) > 200,
							exit: velocity => Math.abs(velocity) < 30,
						}}
					/>
				)}
			</div>
		);
	},
);
