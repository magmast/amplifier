/**
 * Options for the range function.
 */
export interface RangeOptions {
  /**
   * The starting value of the range (inclusive). Default is 0.
   */
  from?: number;
  /**
   * The ending value of the range (exclusive).
   */
  to: number;
  /**
   * The step value between each element in the range. Default is 1.
   */
  step?: number;
}

/**
 * Creates an array of numbers within a specified range.
 *
 * @param options - The range options.
 * @returns An array of numbers within the specified range.
 */
const range = ({ from = 0, to, step = 1 }: RangeOptions) => {
  return new Array(Math.floor((to - from) / step))
    .fill(0)
    .map((_, index) => from + index * step);
};

export default range;
