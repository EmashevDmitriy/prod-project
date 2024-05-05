import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleSortSelector } from './ArticleSortSelector';

const meta: Meta<typeof ArticleSortSelector> = {
	title: 'entities/ArticleSortSelector',
	component: ArticleSortSelector,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleSortSelector>;

export const Normal: Story = {
	args: {},
};

export const NormalDark: Story = {
	args: {},
	decorators: [ThemeDecorator(Theme.DARK)],
};
