const convertToLocaleDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default convertToLocaleDateString;
