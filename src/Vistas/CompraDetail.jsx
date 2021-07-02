import { PedidoDetailShower } from "../Componentes/PedidoDetailShower";

export const CompraDetail = () => {
  return (
    <>
      <PedidoDetailShower pedido={{ qr: "Test?QR?STRING", monto_total: 25 }} />
    </>
  );
};
