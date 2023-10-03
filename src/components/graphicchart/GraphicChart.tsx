import { Clock } from "phosphor-react";
import "./GraphicChart.modules.css";
import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "18:00",
    Valor: "4000.00",
  },
  {
    name: "18:30",
    Valor: "3000.00",
  },
  {
    name: "19:00",
    Valor: "2000.00",
  },
  {
    name: "19:30",
    Valor: "2780.00",
  },
  {
    name: "20:00",
    Valor: "1890.00",
  },
  {
    name: "20:30",
    Valor: "2390.00",
  },
  {
    name: "21:00",
    Valor: "3490.00",
  },
  {
    name: "21:30",
    Valor: "3500.00",
  },
  {
    name: "22:00",
    Valor: "4000.00",
  },
];

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip graphicchart">
        <div>
          <p className="label">
            <Clock size={18} />
            {`${label}`}
          </p>
        </div>
        <p className="intro">
          <a>&nbsp;R$&nbsp;&nbsp;&nbsp;</a>
          {`${payload[0].value}`}
        </p>
      </div>
    );
  }

  return null;
};

const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;
  const formattedValue = `R$ ${payload.value.toFixed(2)}`;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-55} y={0} dy={-5} textAnchor="end" fill="#ffdf29">
        {formattedValue}
      </text>
    </g>
  );
};

export default class GraphicChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer
        width="95%"
        height="60%"
        className="GraphicChartContainer"
      >
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 50,
            right: 50,
            left: 100,
            bottom: 5,
          }}
          barSize={80}
        >
          <XAxis fill="#d4a90b" dataKey="name" />
          <YAxis fill="#d4a90b" tick={<CustomYAxisTick />} />
          <Tooltip cursor={{ fill: "#464545" }} content={<CustomTooltip />} />
          <Bar dataKey="Valor" fill="#d4a90b" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
