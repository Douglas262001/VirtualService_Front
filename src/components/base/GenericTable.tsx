type Props = {
  values?: any[];
  columns?: string[];
  onClickRow?: (row: any) => void;
  activeColParam?: string;
  activeColValue?: any;
};

const GenericTable = ({
  values,
  columns,
  onClickRow,
  activeColParam,
  activeColValue,
}: Props) => {
  return (
    <div className="max-h-full overflow-y-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {columns?.map((columnName, i) => (
              <th key={i}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values?.map((rowValues, i) => (
            <tr key={i} onClick={() => onClickRow && onClickRow(rowValues)}>
              {columns?.map((columnName, j) => {
                let className = "";
                if (activeColParam) {
                  if (rowValues[activeColParam] === activeColValue) {
                    className = "bg-green-800";
                  }
                }
                return (
                  <td className={className} key={j}>
                    {rowValues[columnName]}
                  </td>
                ); // <td key={j}>{rowValues[columnName]}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
