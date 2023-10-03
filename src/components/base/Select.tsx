import { Combobox, Transition } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";
import { Fragment, useState } from "react";

const Select = ({ data, displayValue, value, setValue }: any) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data?.filter((person: any) =>
          person[displayValue]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-80">
      <Combobox value={value} onChange={setValue}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-3 pl-3 pr-10 text-sm bg-[color:var(--w-base-100)] leading-5 text-white focus:ring-0"
              displayValue={(person: any) =>
                person ? person[displayValue] : ""
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretDown size={20} />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-20  mt-1 max-h-60 w-full overflow-auto rounded-md bg-[color:var(--w-base-100)] py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-white">
                  Nenum resultado.
                </div>
              ) : (
                filteredData.map((person: any) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 text-white ${
                        active ? "bg-[color:var(--w-bg-color)]" : ""
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 text-white`}
                          >
                            <Check size={20} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default Select;
