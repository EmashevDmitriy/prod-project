import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleTypeTabs } from './ArticleTypeTabs';

const meta: Meta<typeof ArticleTypeTabs> = {
	title: 'entities/ArticleTypeTabs',
	component: ArticleTypeTabs,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleTypeTabs>;

export const Normal: Story = {
	args: {},
};

export const NormalDark: Story = {
	args: {},
	decorators: [ThemeDecorator(Theme.DARK)],
};
