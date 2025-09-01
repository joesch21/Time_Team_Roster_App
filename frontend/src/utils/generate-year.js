import { DateTime } from 'luxon';
import { TIMEZONE, FULL_TIME_WEEK, PART_TIME_WEEK } from './roster-rotation';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function weekDates(weekStartISO) {
  const start = DateTime.fromISO(weekStartISO, { zone: TIMEZONE });
  return DAYS.map((_, i) => start.plus({ days: i }));
}

function expandWeek(map, dates) {
  const out = [];
  DAYS.forEach((d, i) => {
    (map[d] || []).forEach(shift => {
      out.push({
        date: dates[i].toISODate(),
        day: d,
        start: shift.start,
        end: shift.end
      });
    });
  });
  return out;
}

export function generateYear({ year, anchorMondayISO }) {
  const end = DateTime.fromObject({ year, month: 12, day: 31 }, { zone: TIMEZONE });
  let weekStart = DateTime.fromISO(anchorMondayISO, { zone: TIMEZONE });

  const fullTime = [];
  const partTime = [];
  for (; weekStart <= end; weekStart = weekStart.plus({ weeks: 1 })) {
    const dates = weekDates(weekStart.toISODate());
    fullTime.push(...expandWeek(FULL_TIME_WEEK, dates));
    partTime.push(...expandWeek(PART_TIME_WEEK, dates));
  }
  return { year, timezone: TIMEZONE, anchorMondayISO, fullTime, partTime };
}

export function toCSV(rows) {
  const header = 'Date,Day,Shift Start,Shift End';
  const body = rows.map(r => `${r.date},${r.day},${r.start},${r.end}`).join('\n');
  return `${header}\n${body}\n`;
}

// local persistence helpers
export const storeRoster = (data) => {
  localStorage.setItem(`roster.fullTime.${data.year}`, JSON.stringify(data.fullTime));
  localStorage.setItem(`roster.partTime.${data.year}`, JSON.stringify(data.partTime));
  localStorage.setItem('roster.meta', JSON.stringify({ tz: data.timezone, anchor: data.anchorMondayISO }));
};

export const loadRoster = (year) => {
  const full = JSON.parse(localStorage.getItem(`roster.fullTime.${year}`) || '[]');
  const part = JSON.parse(localStorage.getItem(`roster.partTime.${year}`) || '[]');
  const meta = JSON.parse(localStorage.getItem('roster.meta') || '{}');
  return { year, fullTime: full, partTime: part, meta };
};

