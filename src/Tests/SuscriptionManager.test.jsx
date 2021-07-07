import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuscriptionManager } from "../Componentes/SuscriptionManager";
describe("Suscription Component", () => {
  const onClickMock = jest.fn();

  let makeNewRender;

  beforeEach(() => {
    const { rerender } = render(
      <SuscriptionManager empreData={{ id_negocio: 1 }} />
    );
    makeNewRender = rerender;
  });

  it("Should render without crashing", () => {
    const suscriptionElement = screen.getByTestId("suscriptionWrapper");
    expect(suscriptionElement).toBeInTheDocument();
  });

  it("Should execute onClick function", () => {
    const suscriptionButton = screen.getByTestId("stripeButton");

    userEvent.click(suscriptionButton, onClickMock);
    expect(onClickMock).toBeCalledTimes(1);
  });
});
