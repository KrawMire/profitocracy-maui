export function convertArrayToTwoDimensional<T>(array: T[]): T[][] {
  const result: T[][] = [];

  if (array.length === 0) {
    return [];
  }

  for (let i = 0; i < Math.ceil(array.length / 2); i++) {
    result.push([]);

    for (let j = 0; j < 2; j++) {
      const index = i > 0 ? i * 2 + j : i + j;

      if (!array[index]) {
        break;
      }

      result[i].push(array[index] as T);
    }
  }

  return result;
}
