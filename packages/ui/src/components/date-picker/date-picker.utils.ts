import { EventHandler, RefObject, useEffect } from 'react';

import { DuetDatePickerElement } from './date-picker.types.js';

const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * @param date the date to format as a Date
 * @param format the format string eg. "dd.mm.yyyy", "YYYY-MM-DD"
 */
export function formatDate(date: Date, format: string) {
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
  handler?: EventHandler<any>,
) {
  useEffect(() => {
    if (ref?.current && handler) {
      const element = ref.current;
      element.addEventListener(eventName as any, handler);
      return () => element.removeEventListener(eventName as any, handler);
    }
  }, [eventName, handler]);
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
  const matches = value.match(ISO_DATE_FORMAT);
  if (matches) {
    return createDate(matches[1], matches[2], matches[3]);
  }
}
