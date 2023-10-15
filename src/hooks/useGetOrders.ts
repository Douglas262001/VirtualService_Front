import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { format } from "date-fns";
import { PedidoType } from "types/Pedido";
import ptBR from "date-fns/locale/pt-BR";

const useGetOrders = () => {
  return useQuery(["getOrders"], getOrders());
};

const getOrders = () => {
  return (): Promise<PedidoType[]> =>
    api.get(`Pedido/Listar`).then(({ data }) =>
      data.body.map((pedido: PedidoType) => ({
        numero: pedido.numeroPedido,
        valor: pedido.valorTotal,
        "data/Hora": format(
          new Date(pedido.dataHoraPedido),
          "dd/MM/yyyy hh:mm:ss",
          { locale: ptBR }
        ),
      }))
    );
};

export default useGetOrders;
