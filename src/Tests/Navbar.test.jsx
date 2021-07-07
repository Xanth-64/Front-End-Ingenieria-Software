import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavBar } from "../Componentes/navBar";
import { BrowserRouter as Router } from "react-router-dom";
describe("NavBar Component", () => {
  let makeNewRender;

  beforeEach(() => {
    const { rerender } = render(
      <Router>
        <NavBar />
      </Router>
    );
    makeNewRender = rerender;
  });

  it("Should render without crashing", () => {
    const navbarElement = screen.getByTestId("NavBar");
    expect(navbarElement).toBeInTheDocument();
  });
});
