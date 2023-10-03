import useGetUsersByRole from "../../../hooks/useGetUsersByRole";
import { usersRoles } from "../../../utils/usersEnum";
import GenericLoading from "../../base/GenericLoading";
import Select from "../../base/Select";

const GeneralTab = ({
  name,
  setName,
  teacher,
  setTeacher,
  tagId,
  setTagId,
}: any) => {
  const { data: teachers, isLoading } = useGetUsersByRole(usersRoles.teacher);

  if (isLoading) return <GenericLoading size={60} />;

  return (
    <div className="w-full flex flex-col">
      <span className="label-text">Nome da disciplina</span>
      <input
        type="text"
        name="subject_name"
        value={name}
        placeholder="Escreva aqui"
        onChange={(e) => setName(e.target.value)}
        required
        className="input input-bordered w-full mb-4"
      />
      <div className="flex">
        <div>
          <span className="label-text">Professor</span>
          <Select
            data={teachers}
            displayValue="name"
            value={teacher}
            setValue={setTeacher}
            className="flex-1"
          />
        </div>
        <div className="flex flex-col flex-1 ml-2">
          <span className="label-text mb-1">Id da tag</span>
          <input
            type="text"
            name="tag_id"
            value={tagId}
            placeholder="Escreva aqui"
            onChange={(e) => setTagId(e.target.value)}
            required
            className="input input-bordered"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
