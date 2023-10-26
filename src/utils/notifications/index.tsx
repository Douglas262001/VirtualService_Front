import { ActionReceivedType, EnumAcaoHub } from "@utils/signalR";
import { toast } from "sonner";

export const notificationHandler = ({
  acao,
  numeroMesa,
}: ActionReceivedType) => {
  switch (acao) {
    case EnumAcaoHub.ChamarGarcom:
      return toast(`Garcom chamado na mesa ${numeroMesa}`, {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss,
        },
      });

    case EnumAcaoHub.SolicitarConta:
      return toast(`Conta solicitada na mesa ${numeroMesa}`, {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss,
        },
      });

      break;
  }
};
