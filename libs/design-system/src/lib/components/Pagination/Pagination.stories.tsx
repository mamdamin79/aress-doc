import { Meta, StoryObj } from "@storybook/react";
import {Pagination} from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    pageCount: { control: { type: "number", min: 1 } },
    onPageChange: { action: "page changed" },
  },
  args: {
    pageCount: 10,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
