import { DateTime } from "luxon";

export function postDate(date, format = "d LLLL yyyy") {
  return DateTime.fromJSDate(date).toFormat(format);
}