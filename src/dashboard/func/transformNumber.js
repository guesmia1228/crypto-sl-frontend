export function transformNumber(num) {
  let str = num.toString();
  let result = "";

  for (let i = str.length - 1, j = 0; i >= 0; i--, j++) {
    if (j === 2) {
      result = "." + result;
      j = -1;
    }
    result = str[i] + result;
  }

  return result.replace(/^(\d)(\d{3}\.)/, "$1,$2");
}
