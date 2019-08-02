export const sortElementsByType = (array) => {
  const result = {};
  array.forEach(element => {
    const { type } = element;
    if (!type) {
      throw new Error(`Element in array has no type property, ${array}`);
    }
    const propName = `${type}s`;
    if (result.hasOwnProperty(propName)) {
      result[propName].push(element);
    } else {
      result[propName] = [element];
    }
  });
  return result;
};