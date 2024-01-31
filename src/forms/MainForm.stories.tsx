import type { Meta } from "@storybook/react";
import PriceRequestPage from "./MainForm";

const meta: Meta<typeof PriceRequestPage> = {
  component: PriceRequestPage,
};
export default meta;

export const Default = {
  render: () => {
    return <PriceRequestPage />;
  },
};
