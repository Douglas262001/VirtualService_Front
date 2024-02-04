import { Combobox, Transition } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";
import { Fragment, useState } from "react";

interface SearchFieldProps<T> {
  data: T[];
  displayValue: Extract<keyof T, string>;
  valueField: Extract<keyof T, string>;
  value: T;
  setValue: React.Dispatch<T>;
  optionsHeight?: string;
  disabled?: boolean;
}

function SearchField<T>({
  data,
  displayValue,
  valueField,
  value,
  setValue,
  optionsHeight,
  disabled
}: SearchFieldProps<T>) {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((item) =>
          (item[displayValue] as string).toString()
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-[25vh]">
      <Combobox value={value} onChange={setValue} disabled={disabled ?? false}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-3 pl-3 pr-10 text-sm bg-[#303030] leading-5 text-white focus:ring-0"
              displayValue={(item: T) =>
                item ? (item[displayValue] as string) : ""
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretDown aria-hidden="true" size={20} />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              style={{ height: `${optionsHeight}px` }}
              className={`absolute overflow-auto z-20  mt-1 w-full rounded-md bg-[#303030] py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm`}
            >
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-white">
                  Nenhum resultado.
                </div>
              ) : (
                filteredData.map((item) => (
                  <Combobox.Option
                    key={item[valueField] as string}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 text-white ${
                        active ? "bg-[color:var(--w-bg-color)]" : ""
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item[displayValue] as string}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
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
}

export default SearchField;
