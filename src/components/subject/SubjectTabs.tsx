import { Tab } from "@headlessui/react";
import GeneralTab from "./tabs/GeneralTab";
import MeetsTab from "./tabs/MeetsTab";
import StudentsTab from "./tabs/StudentsTab";

type tabsTitle = {
  id: number;
  title: string;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SubjectTabs = ({
  subject,
  setSubject,
  studentsList,
  setStudentsList,
  name,
  setName,
  teacher,
  setTeacher,
  tagId,
  setTagId,
  meets,
  setMeets,
  beginTime,
  setBeginTime,
  finishTime,
  setFinishTime,
  callNumbers,
  setCallNumbers,
}: any) => {
  const tabs: tabsTitle[] = [
    {
      id: 1,
      title: "Geral",
    },
    {
      id: 2,
      title: "Alunos",
    },
    {
      id: 3,
      title: "Encontros",
    },
  ];

  return (
    <div className="w-full max-w-3xl px-2 mt-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-[color:var(--w-base-100)] p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-[color:var(--w-base-color)] focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-[color:var(--w-bg-color)] shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <GeneralTab
              name={name}
              setName={setName}
              teacher={teacher}
              setTeacher={setTeacher}
              tagId={tagId}
              setTagId={setTagId}
            />
          </Tab.Panel>
          <Tab.Panel>
            <StudentsTab
              studentsList={studentsList}
              setStudentsList={setStudentsList}
              subject={subject}
              setSubject={setSubject}
            />
          </Tab.Panel>
          <Tab.Panel>
            <MeetsTab
              meets={meets}
              setMeets={setMeets}
              beginTime={beginTime}
              setBeginTime={setBeginTime}
              finishTime={finishTime}
              setFinishTime={setFinishTime}
              callNumbers={callNumbers}
              setCallNumbers={setCallNumbers}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SubjectTabs;
