import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticlesPageFilters } from './ArticlesPageFilters';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof ArticlesPageFilters> = {
	title: 'pages/ArticlesPageFilters',
	component: ArticlesPageFilters,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticlesPageFilters>;

export const Normal: Story = {
	args: {},
	decorators: [StoreDecorator({ articlesPage: { order: 'asc', search: '' } })],
};

export const NormalDark: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Theme.DARK),
		StoreDecorator({ articlesPage: { order: 'asc', search: '' } }),
	],
};
