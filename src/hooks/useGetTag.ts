import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { TagType, EnumStatusTag } from "types/TagType";

const useGetTag = () => {
  return useQuery(["getTags"], getTags());
};

const getTags
 = () => {
  return (): Promise<TagType[]> =>
    api.get(`Tags/Listar`).then(({ data }) =>
      data.body.map((tag: TagType) => ({
        id: tag.id,
        numero: tag.numero,
        codigoQrCode: tag.codigoQrCode,
        status: tag.status,
        "Status": EnumStatusTag.get(tag.status)
      }))
    );
};

export default useGetTag;
