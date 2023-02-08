export function convertArrayToTwoDimensional<T>(array: T[]): T[][] {
  const result: T[][] = [];

  if (array.length === 0) {
    return [];
  }

  for (let i = 0; i < array.length / 2; i++) {
    result.push([]);

    for (let j = 0; j <= 1; j++) {
      if (!array[i + j + 1]) {
        break;
      }

      result[i].push(array[i*2 + j] as T);
    }
  }

  return result;
}