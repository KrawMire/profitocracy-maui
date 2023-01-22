import { v4 as uuid } from "uuid";

export function getNewId(): string {
  return uuid();
}