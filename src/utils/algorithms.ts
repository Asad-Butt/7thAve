/**
 *
 * @param {num} number
 */
export function kFormatter(num: number) {
  if (Math.abs(num) > 999) {
    let reformatted =
      Math.sign(num) * (Math.abs(num) / 1000).toFixed(1).toString();
    return reformatted + "k";
  } else {
    return Math.sign(num) * Math.abs(num);
  }
}
/**
 *
 * @param {word} string
 */
export function firstLetterCap(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function asyncDelay(time: number) {
  return new Promise((res) => setTimeout(res, time));
}
