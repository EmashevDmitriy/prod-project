import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ArticlesPage from './ArticlesPage';

const meta: Meta<typeof ArticlesPage> = {
	title: 'pages/ArticlesPage',
	component: ArticlesPage,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticlesPage>;

export const Light: Story = {};

export const Dark: Story = {
	decorators: [ThemeDecorator(Theme.DARK)],
};
