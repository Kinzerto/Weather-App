import {
  format,
  differenceInCalendarDays,
  isTomorrow,
  isToday,
  set,
} from 'date-fns';

export function formatSmartDate(dateInput) {
  if (!dateInput) return '';

  const date = new Date(dateInput);
  const today = new Date();

  if (isToday(date)) {
    return 'Today';
  }

  if (isTomorrow(date)) {
    return 'Tomorrow';
  }

  const diffDays = differenceInCalendarDays(date, today);
  if (diffDays > 1 && diffDays <= 7) {
    return format(date, 'EEEE');
  } else {
    return format(date, 'd MMM');
  }
}

export function formatTime(whatTime) {
  const time = whatTime;
  const [hours, minutes, seconds] = time.split(':').map(Number);

  // take today's date, then set the time
  const date = set(new Date(), {
    hours,
    minutes,
    seconds,
  });

  const result = format(date, 'ha'); // → 2AM

  return result;
}
