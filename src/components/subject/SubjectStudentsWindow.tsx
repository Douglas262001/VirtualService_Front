import { useEffect, useState } from "react";

import enviroment from "../../environments/enviroment";
import { subject } from "../../hooks/useGetSubjects";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import GenericWindow from "../base/GenericWindow";
import api from "@utils/api";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  subject: subject;
};

const getStudentInSubject = (id: number) => {
  if (!id) return;
  return api
    .get(`${enviroment.railway}educator/list/students/${id}/`)
    .then(({ data }) => data);
};

const SubjectStudentsWindow = ({ isOpen, setIsOpen, subject }: Props) => {
  const [studentsInSubject, setSudentsInSubject] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSudentsInSubject([]);
      getStudentInSubject(subject.id)?.then(({ students }) =>
        setSudentsInSubject(students)
      );
    }
  }, [isOpen, subject]);

  return (
    <>
      <GenericWindow
        title={`${subject?.subject_name} - Alunos `}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {studentsInSubject?.length ? (
          <GenericTable
            values={studentsInSubject}
            columns={Object.keys(studentsInSubject[0])}
          />
        ) : (
          <GenericLoading />
        )}
      </GenericWindow>
    </>
  );
};

export default SubjectStudentsWindow;
