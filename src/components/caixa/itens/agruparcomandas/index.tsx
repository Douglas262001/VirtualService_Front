import GenericWindow from "@components/base/GenericWindow";
import * as React from "react";
import { TagOpenSearchType, TagSearchType, TagType } from "types/TagType";
import SearchField from "@components/base/SearchField";
import api from "@utils/api";
import { toast } from "sonner";
import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import { Plus } from "phosphor-react";
import GenericTable from "@components/base/GenericTable";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    comanda?: TagType | null;
    setComanda?: React.Dispatch<TagType | null>;
};

const GroupTagWindow = ({ isOpen, setIsOpen }: Props) => {
    const [comandas, setComandas] = React.useState<TagSearchType[]>([]);
    const [comanda, setComanda] = React.useState<TagSearchType>({
        id: 0,
        numero: "0",
        status: 0,
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const buscarComandasAbertas = async () => {
        try {
            const { data } = await api.get(`Caixa/ListarComandasAbertas`);

            setComandas(data.body);
        } catch (error: any) {
            toast.error(error.response.data.reasonPhrase);
        }
    };

    const handleClickAdicionarComanda = () => {

    };

    React.useEffect(() => {
        if (!isOpen) return;

        buscarComandasAbertas();
    }, [isOpen]);

    const handleClickCancelar = () => {
        setIsOpen(false);
    };

    return (
        <GenericWindow
            maxWidth="w-[20vw]"
            title="Agrupar comandas"
            isOpen={isOpen}
            setIsOpen={setIsOpen}>
            <form className="form-control">
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
                        columns={[
                            "id",
                            "numero",
                        ]}
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
