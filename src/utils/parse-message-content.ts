const decodeUnicodeEscapes = (value: string) => {
  return value.replace(/\\u([\dA-Fa-f]{4})/g, (_, group: string) =>
    String.fromCharCode(parseInt(group, 16))
  );
};

const decodeCommonEscapes = (value: string) => {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
};

export const parseMessageContent = (value: string) => {
  if (!value) {
    return "";
  }

  return decodeCommonEscapes(decodeUnicodeEscapes(value));
};