import React from "react";
import "rsuite/dist/styles/rsuite-default.css";
import { BrowserRouter as Router } from "react-router-dom";

import { EmpreWorkZone } from "../Componentes/EmpreWorkZone";

export default {
  component: EmpreWorkZone,
  title: "Components/EmpreWorkZone",
};

const Story = (args) => (
  <Router>
    <EmpreWorkZone {...args} />
  </Router>
);

export const Normal = Story.bind({});

Normal.args = {
  empreData: { id_negocio: 1 },
};
