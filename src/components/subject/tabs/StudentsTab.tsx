import GenericTable from "../../base/GenericTable";
import Select from "../../base/Select";
import { useState } from "react";
import useGetUsersByRole from "../../../hooks/useGetUsersByRole";
import { usersRoles } from "../../../utils/usersEnum";
import GenericLoading from "../../base/GenericLoading";

const StudentsTab = ({ studentsList, setStudentsList }: any) => {
  const [selected, setSelected] = useState<any>();
  const { data: students, isLoading } = useGetUsersByRole(usersRoles.student);

  const handleAddAlunosList = () => {
    if (!selected.id)
      return alert("Você precisa selecionar um aluno para realizar essa ação");

    if (!studentsList) return setStudentsList([selected]);

    if (studentsList.find((student: any) => selected.id === student.id))
      return alert("Aluno já adicionado à lista");

    setStudentsList([...studentsList, selected]);
    setSelected({ id: 0, name: "" });
  };

  const handleRemoveAlunosList = () => {
    if (!selected.id)
      return alert("Você precisa selecionar um aluno para realizar essa ação");

    if (!studentsList) return alert("Lista vazia");

    if (!studentsList.find((student: any) => selected.id === student.id))
      return alert("Aluno não adicionado à lista");

    setStudentsList(
      studentsList.filter((student: any) => selected.id !== student.id)
    );
    setSelected({ id: 0, name: "" });
  };

  if (isLoading) return <GenericLoading size={60} />;
  return (
    <div className="w-full max-h-96 flex flex-col">
      <div className="flex mb-2">
        <div>
          <span className="label-text">Aluno</span>
          <Select
            value={selected}
            setValue={setSelected}
            data={students}
            displayValue="name"
          />
        </div>
        <button
          type="button"
          onClick={handleAddAlunosList}
          className="btn btn-primary mt-6 ml-2"
        >
          Adicionar
        </button>
        <button
          type="button"
          onClick={handleRemoveAlunosList}
          className="btn btn-error mt-6 ml-2"
        >
          Remover
        </button>
      </div>
      <GenericTable values={studentsList} columns={["id", "name"]} />
    </div>
  );
};

export default StudentsTab;
