const GetValidDate = (date: string) => {
  const takedDate = new Date(`${date}`);

  const formattedDate = takedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = takedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { formattedDate, formattedTime };
};

export default GetValidDate;
