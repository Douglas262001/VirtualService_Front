import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericWindow from "@components/base/GenericWindow";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TagType } from "types/TagType";
import * as yup from "yup";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  tag?: TagType | null;
  setTag?: React.Dispatch<TagType | null>;
};

type TagFormType = {
    id?: number;
    numero?: number;
    codigoQrCode: string;
    status?: number;
};

const formSchema = yup.object({
  codigoQrCode: yup.string().required("Você precisa informar o campo Codigo QrCode"),
});

const TagWindow = ({ isOpen, setIsOpen, tag, setTag }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TagFormType>({
    resolver: yupResolver(formSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!tag) return;

    setValue("id", tag.id);
    setValue("numero", tag.numero);
    setValue("codigoQrCode", tag.codigoQrCode || "");
  }, [tag]);

  const mutationCreate = useMutation(
    (s: TagType) => api.post(`Tags/Inserir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTags"]);
        toast.success("Comanda cadastrada com sucesso!");
        setIsLoading(false);
        setIsOpen(false);
        limparCampos();
      },
      onError: (error: any) => {
        setIsLoading(false);

        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutationUpdate = useMutation(
    (s: TagType) => {
      return api.put(`Tags/Alterar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTags"]);
        setIsLoading(false);
        toast.success("Comanda alterada com sucesso!");
        setIsOpen(false);
        limparCampos();
      },
      onError: (error: any) => {
        setIsLoading(false);
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const onSubmit: SubmitHandler<TagType> = (data) => {
    setIsLoading(true);
    if (data.id) {
      mutationUpdate.mutate(data);
      return;
    }
    mutationCreate.mutate(data);
  };

  const handleCancel = () => {
    setIsOpen(false);
    limparCampos();
  };

  const limparCampos = () => {
    setTag && setTag(null);
    setValue("id", 0);
    setValue("numero", 0);
    setValue("codigoQrCode", "");
  };

  return (
    <GenericWindow title="Comandas" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col">
              <span className="label-text">Numero</span>
              <input
                type="number"
                placeholder="Numero da comanda"
                className="input input-bordered w-full mb-3"
                {...register("numero", {
                  shouldUnregister: true,
                  value: tag?.numero ?? 0,
                })}
              />
            </div>
            <p className="text-red-500">{errors.numero?.message}</p>
            <div className="w-full flex flex-col">
              <span className="label-text">Codigo Qr Code</span>
              <textarea
                placeholder="Codigo QR Code"
                className="input input-bordered w-full mb-3"
                {...register("codigoQrCode", {
                  shouldUnregister: true,
                  value: tag?.codigoQrCode ?? "",
                })}
              ></textarea>
            </div>
          </div>
          <div className="modal-action">
            <ButtonCancel type="button" onClick={handleCancel} />
            <ButtonSave isLoading={isLoading} type="submit" />
          </div>
        </div>
      </form>
    </GenericWindow>
  );
};

export default TagWindow;
