import React from "react";
import "rsuite/dist/styles/rsuite-default.css";

import { StarShower } from "../Componentes/StarShower";

export default {
  component: StarShower,
  title: "Components/StarShower",
  argTypes: {
    pointsAvg: {
      control: { type: "number", min: 0, max: 5 },
    },
  },
};

const Story = (args) => <StarShower {...args} />;

export const Points_1 = Story.bind({});

Points_1.args = {
  pointsAvg: 1,
};
