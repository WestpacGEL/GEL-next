import { RefObject, useEffect } from 'react';

import { DuetDatePickerElement } from './date-picker.types.js';

const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * @param date the date to format as a Date
 * @param format the format string eg. "dd.mm.yyyy", "YYYY-MM-DD"
 */
export function formatDate(date: Date, format: 'dd-MM-yyyy' | 'dd/MM/yyyy') {
  if (!date) {
    return '';
  }
  let d = date.getDate().toString(10);
  let m = (date.getMonth() + 1).toString(10);
  const y = date.getFullYear().toString(10);
  // days are not zero-indexed, so pad if less than 10
  if (date.getDate() < 10) {
    d = `0${d}`;
  }
  // months *are* zero-indexed, pad if less than 9!
  if (date.getMonth() < 9) {
    m = `0${m}`;
  }
  return format.replace(/MM/i, m).replace(/YYYY/i, y).replace(/DD/i, d);
}

/**
 * @param ref Element ref
 * @param eventName Event name for the event listener
 * @param handler Callback for the event
 */
export function useListener(
  ref: RefObject<DuetDatePickerElement> | null,
  eventName: string,
  handler?: EventListenerOrEventListenerObject,
) {
  useEffect(() => {
    if (ref?.current && handler) {
      const element = ref.current;
      element.addEventListener(eventName, handler);
      return () => element.removeEventListener(eventName, handler);
    }
  }, [eventName, handler, ref]);
}

export function createDate(year: string, month: string, day: string) {
  const dayInt = parseInt(day, 10);
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);
  const isValid =
    Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0;
  if (isValid) {
    return new Date(yearInt, monthInt - 1, dayInt);
  }
}

/**
 * @param value date string in ISO format YYYY-MM-DD
 */
export function parseISODate(value: string) {
  const matches = ISO_DATE_FORMAT.exec(value);
  if (matches) {
    return createDate(matches[1], matches[2], matches[3]);
  }
}

/**
 * @param date Date
 * @param disableWeekends boolean to disable weekends
 * @param disableDaysOfWeek array of disable days of the week
 * @param disableDates Disabled dates
 */
export function isDateDisabled(
  date: Date,
  disableWeekends?: boolean,
  disableDaysOfWeek?: number[],
  disableDates?: string[],
) {
  if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
    return true;
  }
  if (disableDaysOfWeek?.includes(date.getDay())) {
    return true;
  }
  return !!disableDates?.some((d: string) => date.getTime() === parseISODate(d)?.getTime());
}
