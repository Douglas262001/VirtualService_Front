type Props = {
  values?: any[];
  columns?: string[];
  onClickRow?: (row: any) => void;
};

const GenericTable = ({ values, columns, onClickRow }: Props) => {
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
              {columns?.map((columnName, j) => (
                <td key={j}>{rowValues[columnName]}</td>
                // <td key={j}>{rowValues[columnName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
