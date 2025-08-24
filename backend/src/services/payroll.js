// Payroll service.  Implements basic calculations for overtime,
// weekend/holiday multipliers and monthly totals.  For the skeleton
// we provide a trivial implementation; extend this with real rules
// and rates as required.

/**
 * Compute a payroll summary given a list of timesheet events.  Each
 * event should contain a date, type (clockIn/clockOut) and time.
 * This function pairs clockIn/out events to determine shift lengths
 * and sums them.  The returned object includes total hours and a
 * placeholder gross pay.
 *
 * @param {Array} events Array of timesheet event objects
 * @param {number} hourlyRate Base hourly rate (default $20)
 */
export function computePayroll(events, hourlyRate = 20) {
  const shifts = [];
  let currentShift = null;
  events.forEach((event) => {
    if (event.type === 'clockIn') {
      currentShift = { start: event };
    } else if (event.type === 'clockOut' && currentShift) {
      currentShift.end = event;
      shifts.push(currentShift);
      currentShift = null;
    }
  });
  // Sum the duration of each shift in hours
  let totalMinutes = 0;
  shifts.forEach(({ start, end }) => {
    const startDate = new Date(`${start.date}T${start.time}:00`);
    const endDate = new Date(`${end.date}T${end.time}:00`);
    const diffMs = endDate - startDate;
    totalMinutes += diffMs / 60000;
  });
  const totalHours = totalMinutes / 60;
  const grossPay = totalHours * hourlyRate;
  return { totalHours, grossPay };
}