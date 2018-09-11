export const sayHello = (request) => {
  const { name } = request.query;
  return `hello! ${name}`;
};
