import { memo } from 'react';
import cls from './ArticleTextBlockComponent.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleTextBlock } from '../../model/types/article';
import { Text } from 'shared/ui/Text/Text';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
	({ className, block }: ArticleTextBlockComponentProps) => {
		return (
			<div className={classNames('', {}, [className])}>
				{block.title && <Text title={block.title} className={cls.title} />}
				{block.paragraphs.map((paragraph, index) => (
					<Text key={index} description={paragraph} className={cls.paragraph} />
				))}
			</div>
		);
	},
);
