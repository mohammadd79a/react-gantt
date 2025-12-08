import { useContext } from 'react';
import storeContext from '../context';
import { useStore } from '@svar-ui/lib-react';
import './TimeScale.css';
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(jalaliday);
dayjs.extend(weekOfYear);

const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد",
  "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر",
  "دی", "بهمن", "اسفند"
];

const persianQuarters = ["بهار", "تابستان", "پاییز", "زمستان"];

function formatPersian(date, unit) {
  const j = dayjs(date).calendar("jalali");

  if (unit === "year") return j.format("YYYY");

  if (unit === "quarter") {
    const q = Math.floor(j.month() / 3);
    return `${persianQuarters[q]} ${j.format("YYYY")}`;
  }

  if (unit === "month") {
    return `${persianMonths[j.month()]} ${j.format("YYYY")}`;
  }
  
  if (unit === "sprint") {
    const d = j.toDate(); // تبدیل به Date میلادی برای منطق اصلی
    const m = j.month();  // ماه جلالی 0..11

    // روز مرزی اسپرینت مثل کد اصلی شما
    const midDate = m === 1 ? 15 : 16; // اردیبهشت = 1

    let startDay, endDay;

    if (d.getDate() < midDate) {
      // اسپرینت اول ماه
      startDay = 1;
      endDay = midDate - 1;
    } else {
      // اسپرینت دوم ماه
      startDay = midDate;
      endDay = j.endOf("month").date();
    }

    return `${persianMonths[m]} ${endDay} - ${startDay}`;
  }

  if (unit === "week") {
    const w = j.week();
    return `هفته ${w}`;
  }

  if (unit === "day") {
    return j.format("D");
  }

  if (unit === "hour") return j.format("HH:mm");

  return j.format("YYYY/MM/DD");
}

function TimeScale(props) {
  const { highlightTime } = props;

  const api = useContext(storeContext);
  const scales = useStore(api, "_scales");

  const containerStyle = {
    width: `${(scales && scales.width) != null ? scales.width : 0}px`,
  };

  return (
    <div className="wx-ZkvhDKir wx-scale" style={containerStyle}>
      {(scales?.rows || []).map((row, rowIdx) => (
        <div
          className="wx-ZkvhDKir wx-row"
          style={{ height: `${row.height}px` }}
          key={rowIdx}
        >
          {(row.cells || []).map((cell, cellIdx) => {
            const extraClass = highlightTime
              ? highlightTime(cell.date, cell.unit)
              : '';
            const className = ['wx-cell', cell.css, extraClass]
              .filter(Boolean)
              .join(' ');
            
            let label = cell.value;
            if (cell.date instanceof Date) {
              label = formatPersian(cell.date, cell.unit);
            }

            return (
              <div
                className={'wx-ZkvhDKir ' + className}
                style={{ width: `${cell.width}px` }}
                key={cellIdx}
              >
                {label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default TimeScale;
