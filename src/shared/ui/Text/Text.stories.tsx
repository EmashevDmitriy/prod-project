import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextSize, TextTheme } from './Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof Text> = {
	title: 'shared/Text',
	component: Text,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
	args: {
		title: 'Some title',
		description: 'Some description',
	},
};

export const SizeL: Story = {
	args: {
		title: 'Some title',
		description: 'Some description',
		size: TextSize.L,
	},
};

export const PrimaryDark: Story = {
	args: {
		title: 'Some title',
		description: 'Some description',
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};

export const Error: Story = {
	args: {
		title: 'Some title error',
		description: 'Some description error',
		theme: TextTheme.ERROR,
	},
};

export const ErrorDark: Story = {
	args: {
		title: 'Some title error',
		description: 'Some description error',
		theme: TextTheme.ERROR,
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};

export const onlyTitleDark: Story = {
	args: {
		title: 'Some title',
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};

export const onlyDescDark: Story = {
	args: {
		description: 'Some description',
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};
