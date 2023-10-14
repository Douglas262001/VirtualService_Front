export type EnumType = { identificador: number; value: string };

export const getArray = (enumMap: Map<number, string>): EnumType[] => {
  const enumArray: EnumType[] = [];

  enumMap.forEach((value: string, key: number) => {
    enumArray.push({ identificador: key, value });
  });

  return enumArray;
};
