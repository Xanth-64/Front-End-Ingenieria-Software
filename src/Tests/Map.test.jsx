import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Map } from "../Componentes/Map";
describe("Starshower Component", () => {
  let makeNewRender;
  const setCoordsMocks = jest.fn();
  beforeEach(() => {
    const { rerender } = render(<Map setCoords={setCoordsMocks} />);

    makeNewRender = rerender;
  });

  it("Should Render Map without Crashing", () => {
    const mapElement = screen.getByTestId("map-id");
    expect(mapElement).toBeInTheDocument();
  });
});
