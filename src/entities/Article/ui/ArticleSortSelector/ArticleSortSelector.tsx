import cls from './ArticleSortSelector.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';

interface ArticleSortSelectorProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo(
	({
		className,
		sort,
		order,
		onChangeOrder,
		onChangeSort,
	}: ArticleSortSelectorProps) => {
		const { t } = useTranslation();
		const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
			() => [
				{
					value: 'asc',
					content: t('возрастанию'),
				},
				{
					value: 'desc',
					content: t('убыванию'),
				},
			],
			[t],
		);

		const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
			() => [
				{
					value: ArticleSortField.CREATED,
					content: t('дате создания'),
				},
				{
					value: ArticleSortField.TITLE,
					content: t('названию'),
				},
				{
					value: ArticleSortField.VIEWS,
					content: t('просмотрам'),
				},
			],
			[t],
		);
		return (
			<div className={classNames(cls.ArticleSortSelector, {}, [className])}>
				<Select
					value={sort}
					onChange={onChangeSort}
					options={sortFieldOptions}
					label={t('Сортировать ПО')}
				/>
				<Select
					value={order}
					onChange={onChangeOrder}
					options={orderOptions}
					label={t('по')}
					className={cls.order}
				/>
			</div>
		);
	},
);
