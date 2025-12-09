import { useContext, useMemo } from 'react';
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

// *** گروه‌بندی عمومی از روی ردیف روز ***
function groupByDayCells(dayCells, getKey, getLabel, unitName) {
  const result = [];
  let currentKey = null;
  let currentWidth = 0;
  let startDate = null;

  for (const cell of dayCells) {
    const j = dayjs(cell.date).calendar("jalali");
    const key = getKey(j);

    if (currentKey === null) {
      currentKey = key;
      startDate = cell.date;
      currentWidth = cell.width;
    } else if (key === currentKey) {
      currentWidth += cell.width;
    } else {
      result.push({
        width: currentWidth,
        value: getLabel(startDate),
        date: startDate,
        css: "",
        unit: unitName,
      });

      currentKey = key;
      startDate = cell.date;
      currentWidth = cell.width;
    }
  }

  // آخرین گروه
  if (currentKey !== null) {
    result.push({
      width: currentWidth,
      value: getLabel(startDate),
      date: startDate,
      css: "",
      unit: unitName,
    });
  }

  return result;
}

// *** فرمت جلالی برای نمایش ***
function formatPersian(date, unit) {
  const j = dayjs(date).calendar("jalali");

  switch (unit) {
    case "year":
      return j.format("YYYY");
    case "quarter":
      return `${persianQuarters[Math.floor(j.month() / 3)]} ${j.format("YYYY")}`;
    case "month":
      return `${persianMonths[j.month()]} ${j.format("YYYY")}`;
    case "sprint": {
        const j = dayjs(date).calendar("jalali");
        const monthName = persianMonths[j.month()];
        const day = j.date();
      
        const isFirst = day <= 15;
      
        const startDay = isFirst ? 1 : 16;
        const endDay = isFirst ? 15 : j.endOf("month").date();
      
        return `${monthName} ${endDay} - ${startDay}`;
      }
    case "week":
      return `هفته ${j.week()}`;
    case "day":
      return j.format("D");
    case "hour":
      return j.format("HH:mm");
    default:
      return j.format("YYYY/MM/DD");
  }
}

function TimeScale({ highlightTime }) {
  const api = useContext(storeContext);
  const scales = useStore(api, "_scales");

  const correctedRows = useMemo(() => {

    if (!scales) return [];
  
    const rows = [...scales.rows];
  
    // map واحد ↔️ index
    const rowMap = {};
    rows.forEach((r, i) => {
      const u = r.cells?.[0]?.unit;
      if (u) rowMap[u] = i;
    });
  
    // سلول مرجع برای هماهنگی
    let dayCells = [];
    if (rowMap.day !== undefined) {
      // اگر day واقعی موجود است
      dayCells = rows[rowMap.day].cells;
    } else {
      // day فرضی بساز
      const start = dayjs(scales.start);
      const end = dayjs(scales.end);
      const dayWidth = scales.lengthUnitWidth || 100;
  
      const cells = [];
      let current = start;
      while (current.isBefore(end) || current.isSame(end, "day")) {
        cells.push({
          width: dayWidth,
          value: current.date(),
          date: current.toDate(),
          css: "",
          unit: "day",
        });
        current = current.add(1, "day");
      }
  
      dayCells = cells;
    }
  
    // ---- YEAR ----
    if (rowMap.year !== undefined) {
      rows[rowMap.year] = {
        ...rows[rowMap.year],
        cells: groupByDayCells(
          dayCells,
          j => j.year(),
          date => dayjs(date).calendar("jalali").format("YYYY"),
          "year"
        ),
      };
    }
  
    // ---- QUARTER ----
    if (rowMap.quarter !== undefined) {
      rows[rowMap.quarter] = {
        ...rows[rowMap.quarter],
        cells: groupByDayCells(
          dayCells,
          j => `${j.year()}-${Math.floor(j.month() / 3)}`,
          date => {
            const j = dayjs(date).calendar("jalali");
            return `${persianQuarters[Math.floor(j.month() / 3)]} ${j.format("YYYY")}`;
          },
          "quarter"
        ),
      };
    }
  
    // ---- MONTH ----
    if (rowMap.month !== undefined) {
      rows[rowMap.month] = {
        ...rows[rowMap.month],
        cells: groupByDayCells(
          dayCells,
          j => `${j.year()}-${j.month()}`,
          date => {
            const j = dayjs(date).calendar("jalali");
            return `${persianMonths[j.month()]} ${j.format("YYYY")}`;
          },
          "month"
        ),
      };
    }
  
    // ---- SPRINT ----
    if (rowMap.sprint !== undefined) {
      rows[rowMap.sprint] = {
        ...rows[rowMap.sprint],
        cells: groupByDayCells(
          dayCells,
          j => {
            const half = j.date() <= 15 ? 1 : 2;
            return `${j.year()}-${j.month()}-${half}`;
          },
          date => {
            const j = dayjs(date).calendar("jalali");
            const monthName = persianMonths[j.month()];
            const dayNum = j.date();
            const endOfMonth = j.endOf("month").date();
  
            if (dayNum <= 15) return `${monthName} 15 - 1`;
            return `${monthName} ${endOfMonth} - 16`;
          },
          "sprint"
        ),
      };
    }
  
    return rows;
  }, [scales]);
  

  const containerStyle = {
    width: `${scales?.width || 0}px`,
  };

  return (
    <div className="wx-ZkvhDKir wx-scale" style={containerStyle}>
      {correctedRows.map((row, rowIdx) => (
        <div
          className="wx-ZkvhDKir wx-row"
          style={{ height: `${row.height}px` }}
          key={rowIdx}
        >
          {row.cells.map((cell, cellIdx) => {
            const extraClass = highlightTime ? highlightTime(cell.date, cell.unit) : '';
            const className = ['wx-cell', cell.css, extraClass].filter(Boolean).join(' ');
            const label = cell.date instanceof Date ? formatPersian(cell.date, cell.unit) : cell.value;

            return (
              <div
                className={'wx-ZkvhDKir ' + className}
                style={{ width: `${cell.width}px` }}
                key={cellIdx}
              >
                {cell.unit === "week" ? cell.value : label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default TimeScale;
