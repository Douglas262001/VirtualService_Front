import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "@utils/queryClient";

import enviroment from "../../environments/enviroment";
import GenericWindow from "../base/GenericWindow";
import SubjectTabs from "./SubjectTabs";
import api from "@utils/api";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
};

type Subject = {
  id_professor: number;
  call_numbers: number;
  subject_name: string;
  meet_numbers: number;
  tag_id: string;
  students: number[];
  meets: object[];
};

const SubjectWindow = ({ isOpen, setIsOpen }: Props) => {
  const [subject, setSubject] = useState();
  const [studentsList, setStudentsList] = useState<any>();
  const [name, setName] = useState<string>("");
  const [teacher, setTeacher] = useState<any>();
  const [tagId, setTagId] = useState<string>("");
  const [meets, setMeets] = useState<any>();
  const [beginTime, setBeginTime] = useState<any>();
  const [finishTime, setFinishTime] = useState<any>();
  const [callNumbers, setCallNumbers] = useState<number>(0);

  const mutation = useMutation(
    (s: Subject) => api.post(`${enviroment.railway}adm/new_subject/`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSubjects"], { type: "all" });
        setIsOpen(false);
      },
    }
  );

  const handleSaveSubject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentsList.length)
      return alert("Você precisa selecionar ao menos um aluno!");

    if (!teacher || !callNumbers || !name || !meets.length || !tagId)
      return alert("Voê precisa preencher todos os campos obrigatórios");

    const meetsFormatted = meets.map((meet: any) => {
      return {
        meet_date: meet.format(),
        meet_init: `${beginTime.format()}:00`,
        meet_finish: `${finishTime.format()}:00`,
      };
    });

    const subject = {
      id_professor: teacher.id,
      call_numbers: callNumbers,
      subject_name: name,
      meet_numbers: meetsFormatted.length,
      tag_id: tagId,
      students: studentsList?.map((student: any) => student.id),
      meets: meetsFormatted,
    };

    mutation.mutate(subject);
  };

  return (
    <GenericWindow title="Disciplina" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSaveSubject}>
        <div className="form-control">
          <div className="w-full h-full flex flex-col">
            <SubjectTabs
              subject={subject}
              setSubject={setSubject}
              studentsList={studentsList}
              setStudentsList={setStudentsList}
              name={name}
              teacher={teacher}
              setTeacher={setTeacher}
              setTagId={setTagId}
              tagId={tagId}
              setName={setName}
              meets={meets}
              setMeets={setMeets}
              beginTime={beginTime}
              setBeginTime={setBeginTime}
              finishTime={finishTime}
              setFinishTime={setFinishTime}
              callNumbers={callNumbers}
              setCallNumbers={setCallNumbers}
            />
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </GenericWindow>
  );
};

export default SubjectWindow;
