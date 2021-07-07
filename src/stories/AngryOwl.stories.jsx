import React from "react";
import "rsuite/dist/styles/rsuite-default.css";

import { AngryOwl } from "../Componentes/AngryOwl";

export default {
  component: AngryOwl,
  title: "Components/AngryOwl",
  argTypes: {
    width: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

const Story = (args) => <AngryOwl {...args} />;

export const Normal = Story.bind({});

Normal.args = {
  width: "80",
  prompt: "Prueba",
};
