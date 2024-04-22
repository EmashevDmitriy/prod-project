import cls from './ArticleViewSelector.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleView } from 'entities/Article';
import PlateIcon from 'shared/assets/icons/list-24-24.svg';
import ListIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.LIST,
		icon: ListIcon,
	},
	{
		view: ArticleView.PLATE,
		icon: PlateIcon,
	},
];

export const ArticleViewSelector = memo(
	({ className, view, onViewClick }: ArticleViewSelectorProps) => {
		const onClick = (newView: ArticleView) => () => {
			onViewClick?.(newView);
		};

		return (
			<div className={classNames('', {}, [className])}>
				{viewTypes.map(viewType => (
					<Button
						theme={ButtonTheme.CLEAR}
						key={viewType.view}
						onClick={onClick(viewType.view)}
					>
						<Icon
							className={classNames('', {
								[cls.notSelected]: viewType.view !== view,
							})}
							Svg={viewType.icon}
						/>
					</Button>
				))}
			</div>
		);
	},
);
