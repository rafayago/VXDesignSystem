const data = [
  { month: "Jan", value: 2200 },
  { month: "Feb", value: 3100 },
  { month: "Mar", value: 2600 },
  { month: "Apr", value: 4200 },
  { month: "May", value: 3800 },
  { month: "Jun", value: 5100 },
  { month: "Jul", value: 4800 },
  { month: "Aug", value: 6200 },
  { month: "Sep", value: 5600 },
  { month: "Oct", value: 4900 },
  { month: "Nov", value: 4100 },
  { month: "Dec", value: 3300 },
];

const W = 560;
const H = 180;
const PAD = { top: 10, right: 8, bottom: 30, left: 44 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;

const maxVal = Math.ceil(Math.max(...data.map((d) => d.value)) / 1000) * 1000;
const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(maxVal * t));

const barW = Math.floor(chartW / data.length) - 6;
const barStep = chartW / data.length;

function yPos(val: number) {
  return PAD.top + chartH - (val / maxVal) * chartH;
}

function fmt(n: number) {
  return n >= 1000 ? `$${n / 1000}k` : `$${n}`;
}

export function OverviewChart() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-label="Monthly overview chart"
      className="w-full"
    >
      {/* Grid lines */}
      {gridLines.map((val) => {
        const y = yPos(val);
        return (
          <g key={val}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
            <text
              x={PAD.left - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={9}
              fill="currentColor"
              opacity={0.4}
            >
              {fmt(val)}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const bH = (d.value / maxVal) * chartH;
        const x = PAD.left + i * barStep + (barStep - barW) / 2;
        const y = PAD.top + chartH - bH;
        return (
          <g key={d.month}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={bH}
              rx={3}
              fill="currentColor"
              opacity={0.85}
              className="text-primary transition-opacity hover:opacity-100"
            />
            <text
              x={x + barW / 2}
              y={H - PAD.bottom + 14}
              textAnchor="middle"
              fontSize={9}
              fill="currentColor"
              opacity={0.4}
            >
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
