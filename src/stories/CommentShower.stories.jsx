import React from "react";
import "rsuite/dist/styles/rsuite-default.css";

import { CommentShower } from "../Componentes/CommentShower";

export default {
  component: CommentShower,
  title: "Components/CommentShower",
};

const Story = (args) => <CommentShower {...args} />;

export const Normal = Story.bind({});

Normal.args = {
  commentArr: [
    { fecha: "2001-03-28", comentario: "Docs" },
    { fecha: "2001-03-28", comentario: "Docs" },
    { fecha: "2001-03-28", comentario: "Docs" },
    { fecha: "2001-03-28", comentario: "Docs" },
    { fecha: "2001-03-28", comentario: "Docs" },
  ],
};
