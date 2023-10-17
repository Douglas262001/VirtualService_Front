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
        id: pedido.id,
        numero: pedido.numeroPedido,
        codigoStatus: pedido.status,
        valor: pedido.valorTotal,
        "data/hora": format(
          new Date(pedido.dataHoraPedido),
          "dd/MM/yyyy hh:mm:ss",
          { locale: ptBR }
        ),
        items: pedido.pedidoItems?.map((item) => ({
          nome: item.nomeItem,
          quantidade: item.qtd,
          valor: item.valorUn,
          total: item.valorTotal,
          pago: item.pago ? "Sim" : "Não",
        })),
      }))
    );
};

export default useGetOrders;
