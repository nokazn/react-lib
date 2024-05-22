import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./index.js";

const meta = {
	title: "Accordion",
	component: Accordion,
	tags: ["autodocs"],
	args: {},
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		summary: "summary",
		content: (
			<>
				<div
					style={{
						backgroundColor: "grey",
					}}
				>
					content
				</div>
			</>
		),
	},
};
