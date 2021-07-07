import React from "react";
import "rsuite/dist/styles/rsuite-default.css";

import { AdminWorkZone } from "../Componentes/AdminWorkzone";

export default {
  component: AdminWorkZone,
  title: "Components/AdminWorkZone",
};

const Story = (args) => <AdminWorkZone {...args} />;

export const Normal = Story.bind({});

Normal.args = {};
