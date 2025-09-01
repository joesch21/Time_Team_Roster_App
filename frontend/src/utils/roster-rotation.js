export const TIMEZONE = 'Australia/Sydney';

export const SHIFT = {
  E0500_1500: { start: '05:00', end: '15:00' },
  E0600_1400: { start: '06:00', end: '14:00' },
  D0730_1930: { start: '07:30', end: '19:30' },
  D1230_2030: { start: '12:30', end: '20:30' },
  A1330_2130: { start: '13:30', end: '21:30' },
  PT0500_1300: { start: '05:00', end: '13:00' },
  PT0800_1600: { start: '08:00', end: '16:00' },
  PT1700_2230: { start: '17:00', end: '22:30' },
};

// EDIT these to your true weekly patterns (Mon..Sun)
export const FULL_TIME_WEEK = {
  Mon: [SHIFT.E0500_1500, SHIFT.D0730_1930],
  Tue: [SHIFT.E0500_1500],
  Wed: [SHIFT.D0730_1930],
  Thu: [SHIFT.D1230_2030, SHIFT.A1330_2130],
  Fri: [SHIFT.E0600_1400],
  Sat: [],
  Sun: []
};

export const PART_TIME_WEEK = {
  Mon: [SHIFT.PT1700_2230],
  Tue: [],
  Wed: [SHIFT.PT1700_2230],
  Thu: [SHIFT.PT1700_2230],
  Fri: [SHIFT.PT1700_2230],
  Sat: [SHIFT.PT0800_1600],
  Sun: []
};

