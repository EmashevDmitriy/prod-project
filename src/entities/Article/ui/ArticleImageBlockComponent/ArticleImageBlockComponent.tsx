import { memo } from 'react';
import cls from './ArticleImageBlockComponent.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleImageBlock } from '../../model/types/article';
import { Text, TextAlign } from 'shared/ui/Text/Text';

interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
	({ className, block }: ArticleImageBlockComponentProps) => {
		return (
			<div className={classNames('', {}, [className])}>
				<img src={block.src} alt={block.title} className={cls.img} />
				{block.title && (
					<Text description={block.title} align={TextAlign.CENTER} />
				)}
			</div>
		);
	},
);
