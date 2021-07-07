import React from "react";
import "rsuite/dist/styles/rsuite-default.css";

import { Map } from "../Componentes/Map";

export default {
  component: Map,
  title: "Components/Map",
};

const Story = (args) => <Map {...args} />;

export const Basic_Map = Story.bind({});

Basic_Map.args = {
  setCoords: () => {},
};
