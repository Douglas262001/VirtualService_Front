import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const MeetsTab = ({
  meets,
  setMeets,
  beginTime,
  setBeginTime,
  finishTime,
  setFinishTime,
  callNumbers,
  setCallNumbers,
}: any) => {
  return (
    <div className="w-full flex flex-col">
      <span className="label-text">Encontros</span>
      <DatePicker
        multiple
        format="MM-DD-YYYY"
        value={meets}
        required
        onChange={(dateValues: any) => setMeets(dateValues)}
        inputClass=" w-full bg-[color:var(--w-base-100)] p-2 rounded-md mb-2"
      />
      <span className="label-text">Hora inicial</span>
      <DatePicker
        disableDayPicker
        format="HH:mm"
        required
        value={beginTime}
        onChange={(time: any) => setBeginTime(time)}
        inputClass=" w-full bg-[color:var(--w-base-100)] p-2 rounded-md mb-2"
        plugins={[<TimePicker hideSeconds />]}
      />
      <span className="label-text">Hora final</span>
      <DatePicker
        disableDayPicker
        format="HH:mm"
        required
        value={finishTime}
        onChange={(time: any) => setFinishTime(time)}
        inputClass=" w-full bg-[color:var(--w-base-100)] p-2 rounded-md mb-2"
        plugins={[<TimePicker hideSeconds />]}
      />
      <span className="label-text">Quantidade de chamadas</span>
      <input
        type="number"
        max={4}
        min={1}
        value={callNumbers}
        placeholder="Escreva aqui"
        onChange={(e) => setCallNumbers(e.target.value)}
        required
        className="input input-bordered w-1/2 mb-4 appearance-none"
      />
    </div>
  );
};

export default MeetsTab;
