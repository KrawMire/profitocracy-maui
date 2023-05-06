import moment from "moment/moment";

export function getCurrentDay() {
  return new Date(Date.now()).getDate();
}

export function getCurrentDate() {
  return moment().toDate();
}
