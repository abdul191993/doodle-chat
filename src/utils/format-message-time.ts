const isValidDate = (value: Date) => !Number.isNaN(value.getTime());

export const formatMessageTime = (value: string) => {
  const date = new Date(value);

  if (!isValidDate(date)) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};