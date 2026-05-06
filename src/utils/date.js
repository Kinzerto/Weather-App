import {
  format,
  differenceInCalendarDays,
  isTomorrow,
  isToday,
  set,
  formatDistanceToNow,
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
  if (diffDays > 1 && diffDays <= 6) {
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

  const result = format(date, 'ha');

  return result; //1AM
}

export function formatDateComplete(whatDate) {
  const date = new Date(whatDate);

  const formatted = format(date, 'MMMM d, yyyy');

  return formatted;
}

export function convertTo12Format(whatDate, whatTime) {
  const date = new Date(`${whatDate}T${whatTime}:00`);

  const time = format(date, 'h:mm a');

  return time; // 5:20 AM
}

export function calculateTimeDistance(dateNow, timeNow) {
  const lastUpdated = timeNow;

  const fullDate = new Date(`${dateNow}T${lastUpdated}`);

  const ago = formatDistanceToNow(fullDate, { addSuffix: true });

  return ago; //eg 2 hours ago
}
