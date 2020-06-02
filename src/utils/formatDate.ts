const formatDate = (date: Date): string => {
  const tempDate = new Date(date);
  return tempDate.toLocaleDateString();
};

export default formatDate;
