import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';
import { useTranslation } from 'react-i18next';

interface ArticleTypeTabsProps {
	className?: string;
	value: ArticleType;
	onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(
	({ className, value, onChangeType }: ArticleTypeTabsProps) => {
		const { t } = useTranslation();
		const typeTabs = useMemo<TabItem[]>(
			() => [
				{
					value: ArticleType.ALL,
					content: t('Все'),
				},
				{
					value: ArticleType.IT,
					content: t('Айти'),
				},
				{
					value: ArticleType.ECONOMICS,
					content: t('Экономика'),
				},
				{
					value: ArticleType.SCIENCE,
					content: t('Наука'),
				},
			],
			[t],
		);

		const onTabClick = useCallback(
			(tab: TabItem) => {
				onChangeType(tab.value as ArticleType);
			},
			[onChangeType],
		);

		return (
			<Tabs
				tabs={typeTabs}
				value={value}
				onTabClick={onTabClick}
				className={classNames('', {}, [className])}
			></Tabs>
		);
	},
);
