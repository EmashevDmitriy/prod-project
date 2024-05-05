import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
	title: 'shared/Tabs',
	component: Tabs,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Normal: Story = {
	args: {
		tabs: [
			{
				value: 'Tab 1',
				content: 'Tab 1',
			},
			{
				value: 'Tab2',
				content: 'Tab 2',
			},
			{
				value: 'Tab3',
				content: 'Tab 3',
			},
		],
		value: 'Tab 2',
	},
};

export const NormalDark: Story = {
	args: {
		tabs: [
			{
				value: 'Tab 1',
				content: 'Tab 1',
			},
			{
				value: 'Tab21',
				content: 'Tab 2',
			},
			{
				value: 'Tab31',
				content: 'Tab 3',
			},
		],
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};
