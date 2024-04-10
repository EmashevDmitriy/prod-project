import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Card } from './Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Card> = {
	title: 'shared/Card',
	component: Card,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
	args: {
		children: <Text title="Some Title" description="Some Description Text" />,
	},
};

export const Dark: Story = {
	args: {
		children: <Text title="Some Title" description="Some Description Text" />,
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};
