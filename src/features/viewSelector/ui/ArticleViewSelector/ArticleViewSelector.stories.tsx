import type { Meta, StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
import { ArticleView } from 'entities/Article';
import PlateIcon from 'shared/assets/icons/list-24-24.svg';
import ListIcon from 'shared/assets/icons/tiled-24-24.svg';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof ArticleViewSelector> = {
	title: 'features/ArticleViewSelector',
	component: ArticleViewSelector,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleViewSelector>;

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

export const Primary: Story = {
	argTypes: {
		view: viewTypes,
	},
};

export const Dark: Story = {
	argTypes: {
		view: viewTypes,
	},
	decorators: ThemeDecorator(Theme.DARK),
};
