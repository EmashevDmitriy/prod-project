import type { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';
import { ArticleView } from '../../model/types/article';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof ArticleList> = {
	title: 'entities/ArticleList',
	component: ArticleList,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

export const isLoadingPlate: Story = {
	args: {
		articles: [],
		isLoading: true,
		view: ArticleView.PLATE,
	},
};

export const isLoadingPlateDark: Story = {
	args: {
		articles: [],
		isLoading: true,
		view: ArticleView.PLATE,
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};

export const isLoadingList: Story = {
	args: {
		articles: [],
		isLoading: true,
		view: ArticleView.LIST,
	},
};

export const isLoadingListDark: Story = {
	args: {
		articles: [],
		isLoading: true,
		view: ArticleView.LIST,
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};
