import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericWindow from "@components/base/GenericWindow";
import SearchField from "@components/base/SearchField";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { EnumType, getArray } from "@utils/enums";
import { queryClient } from "@utils/queryClient";
import * as React from "react";
import { toast } from "sonner";
import { EnumStatusPedido } from "types/Pedido";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  codigoPedido: number;
  codigoStatus?: number;
  setCodigoPedido: React.Dispatch<number>;
  setCodigoStatus: React.Dispatch<number | undefined>;
};

type AlterarPedidoDto = {
  codigoPedido: number;
  statusPedido: number;
};

const OrderStatusWindow = ({
  isOpen,
  setIsOpen,
  codigoPedido,
  codigoStatus,
  setCodigoPedido,
  setCodigoStatus,
}: Props) => {
  React.useEffect(() => {
    if (codigoStatus === undefined) return;

    const status = statusArray.find((s) => s.identificador === codigoStatus);

    if (!status) return;

    setStatus(status);
  }, [codigoStatus]);

  const [status, setStatus] = React.useState<EnumType>({
    identificador: 0,
    value: "",
  });

  const statusArray = getArray(EnumStatusPedido);

  const mutationUpdate = useMutation(
    (s: AlterarPedidoDto) => api.put(`Pedido/Alterar`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getOrders"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Pedido alterado com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const limparCampos = () => {
    setStatus({ identificador: 0, value: "" });
    setCodigoPedido(0);
    setCodigoStatus(undefined);
  };

  const handleClickCancelar = () => {
    setIsOpen(false);
    limparCampos();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto: AlterarPedidoDto = {
      codigoPedido: codigoPedido,
      statusPedido: status.identificador,
    };

    mutationUpdate.mutate(dto);
  };

  return (
    <GenericWindow title="Alterar status" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit}>
        <div className="w-full flex flex-col">
          <span className="label-text">Status</span>
          <SearchField
            data={statusArray}
            value={status}
            setValue={setStatus}
            valueField="identificador"
            displayValue="value"
            optionsHeight="80"
          />
        </div>
        <div className="modal-action">
          <ButtonCancel type="button" onClick={handleClickCancelar} />
          <ButtonSave type="submit" />
        </div>
      </form>
    </GenericWindow>
  );
};

export default OrderStatusWindow;
