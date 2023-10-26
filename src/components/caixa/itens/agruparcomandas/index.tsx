import GenericWindow from "@components/base/GenericWindow";
import * as React from "react";
import { TagSearchType, TagType } from "types/TagType";
import SearchField from "@components/base/SearchField";
import api from "@utils/api";
import { toast } from "sonner";
import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import { Plus } from "phosphor-react";
import GenericTable from "@components/base/GenericTable";
import { useRegister } from "context/register/RegisterContext";
import { useMutation } from "@tanstack/react-query";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comanda?: TagType | null;
  setComanda?: React.Dispatch<TagType | null>;
};

const GroupTagWindow = ({ isOpen, setIsOpen }: Props) => {
  const { setRefetchComandas } = useRegister();
  const [comandas, setComandas] = React.useState<TagSearchType[]>([]);
  const [comanda, setComanda] = React.useState<TagSearchType>({
    id: 0,
    numero: "0",
    status: 0,
  });
  const [isLoading] = React.useState<boolean>(false);
  const [comandasSelecionadas, setComandasSelecionadas] = React.useState<
    TagSearchType[]
  >([]);

  const buscarComandasAbertas = async () => {
    try {
      const { data } = await api.get(`Caixa/ListarComandasAbertas`);

      setComandas(data.body);
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const handleClickAdicionarComanda = () => {
    if (comandasSelecionadas.some((p) => p.id === comanda.id))
      return toast.error("Comanda já adicionada!");

    setComandasSelecionadas([
      ...comandasSelecionadas,
      {
        id: comanda.id,
        numero: comanda.numero
      },
    ]);

    setComanda({ id: 0, numero: "", status: 0 });
  };

  React.useEffect(() => {
    if (!isOpen) return;

    buscarComandasAbertas();
  }, [isOpen]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(comandasSelecionadas.map((p)=> p.id || 0));
  };

  const mutation = useMutation(
    (s: number[]) => api.put(`Caixa/AgruparComandas`, s),
    {
      onSuccess: async function () {
        toast.success("Comandas agrupadas com sucesso");
        
        setComandasSelecionadas([]);
        setRefetchComandas(true);
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const handleClickCancelar = () => {
    setComandasSelecionadas([]);
    setIsOpen(false);
  };

  return (
    <GenericWindow
      maxWidth="w-[20vw]"
      title="Agrupar comandas"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form className="form-control" onSubmit={onSubmitForm}>
        <span className="label-text">Comanda</span>
        <div className="flex w-full gap-1 mb-3">
          <SearchField
            value={comanda}
            setValue={setComanda}
            data={comandas}
            displayValue="numero"
            valueField="id"
            optionsHeight="120"
          />
          <button
            className="btn btn-info"
            type="button"
            onClick={handleClickAdicionarComanda}
            disabled={comanda.id === 0}
          >
            <Plus className="mr-2" /> Adicionar
          </button>
        </div>
        <div className="h-72">
          <GenericTable
            values={comandasSelecionadas.map((item) => ({
              id: item.id,
              numero: item.numero,
            }))}
            columns={["id", "numero"]}
          />
        </div>
        <div className="modal-action">
          <ButtonCancel type="button" onClick={handleClickCancelar} />
          <ButtonSave isLoading={isLoading} type="submit" />
        </div>
      </form>
    </GenericWindow>
  );
};

export default GroupTagWindow;
