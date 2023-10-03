import { useEffect, useState } from "react";

const useFilterData = (
  dataToFilter: any[] | undefined,
  searchText: string | undefined
) => {
  const [filterData, setFilterData] = useState<any[]>();

  useEffect(() => {
    if (!dataToFilter || !searchText) {
      setFilterData(dataToFilter);
      return;
    }
    const filteredData = dataToFilter.filter((data) => {
      const dataValues = Object.values(data).join("").toLowerCase();
      return dataValues.includes(searchText.toLowerCase());
    });
    setFilterData(filteredData);
  }, [searchText, dataToFilter]);

  return filterData;
};

export default useFilterData;
