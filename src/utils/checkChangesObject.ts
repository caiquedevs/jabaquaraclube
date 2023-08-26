export const checkChanges = (oldObject: any, newObject: any) => {
  const response = Object.keys(newObject).filter(
    (key: string) => oldObject[key] !== newObject[key]
  );

  return Boolean(response.length);
};
