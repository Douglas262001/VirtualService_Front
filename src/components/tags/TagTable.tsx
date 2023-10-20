import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import {
  PencilSimple,
  TrashSimple,
  LockSimpleOpen,
  LockSimple,
  Clock,
} from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import useGetTag from "@hooks/useGetTag";
import { TagType } from "types/TagType";
import { useState } from "react";
import TagWindow from "./TagWindow";
import "./TagTable.Modules.css";
import Swal from "sweetalert2";

type Props = {
  searchText?: string;
};

const TagTable = ({ searchText }: Props) => {
  const { data: tags, error, isLoading } = useGetTag();

  const filteredTags = useFilterData(tags, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tag, setTag] = useState<TagType | null>(null);

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`Tags/Deletar/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTags"]);
        toast.success("Comanda excluída com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const handleDeleteTag = (id?: number) => async () => {
    if (!id) return;

    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente excluir esta comanda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      iconColor: "#ef4444",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, excluir!",
      background: "#333",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDelete.mutate(id);
      }
    });
  };

  const mutationDisableTag = useMutation(
    (numero?: number) => api.put(`Tags/BloquearTag/${numero}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTags"]);
        toast.success("Comanda bloqueada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const handleDisableTag = (numero?: number) => async () => {
    if (!numero) return;

    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente bloquear esta comanda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      iconColor: "#ef4444",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, bloquear!",
      background: "#333",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDisableTag.mutate(numero);
      }
    });
  };

  const mutationActiveTag = useMutation(
    (numero?: number) => api.put(`Tags/LiberarTag/${numero}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTags"]);
        toast.success("Comanda liberada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const handleActiveTag = (numero?: number) => async () => {
    if (!numero) return;

    mutationActiveTag.mutate(numero);
  };

  const handleInUse = () => async () => {
    return toast.error("Comanda em uso");
  };

  const iconActiveInactive = (status: number, numero?: number) => {
    switch (status) {
      case 0:
        return (
          <LockSimpleOpen
            weight="fill"
            onClick={handleActiveTag(numero)}
            size={24}
            className="cursor-pointer text-lime-400 mx-10"
          />
        );
      case 1:
        return (
          <LockSimple
            weight="fill"
            onClick={handleDisableTag(numero)}
            size={24}
            className="cursor-pointer text-red-400 mx-10"
          />
        );
      case 2:
        return (
          <Clock
            weight="fill"
            onClick={handleInUse()}
            size={24}
            className="cursor-pointer text-yellow-400 mx-10"
          />
        );
    }
  };

  const Status = (status: number) => {
    switch (status) {
      case 0:
        return (
          <div className="tag-bloqueada px-5 py-2 rounded text-black text-sm font-semibold">
            Bloqueada
          </div>
        );
      case 1:
        return (
          <div className="tag-liberada px-5 py-2 rounded text-black text-sm font-semibold">
            Liberada
          </div>
        );
      case 2:
        return (
          <div className="tag-ocupada px-5 py-2 rounded text-black text-sm font-semibold">
            Em uso
          </div>
        );
    }
  };

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!tags?.length) return <div>Não existem tags cadastradas</div>;

  const tableValuesWithIcons = (filteredTags ?? tags).map((tag: TagType) => ({
    "Bloquear / Liberar": iconActiveInactive(tag.status, tag.numero),
    Editar: (
      <PencilSimple
        onClick={() => {
          setTag(tag);
          setIsOpen(true);
        }}
        className="cursor-pointer"
        size={24}
      />
    ),
    ...tag,
    Status: Status(tag.status),
    Excluir: (
      <TrashSimple
        onClick={handleDeleteTag(tag.id)}
        size={26}
        className="cursor-pointer text-red-500"
      />
    ),
  }));

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={[
          "Editar",
          "numero",
          "codigoQrCode",
          "Bloquear / Liberar",
          "Status",
          "Excluir",
        ]}
      />
      <TagWindow
        tag={tag}
        setTag={setTag}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default TagTable;
