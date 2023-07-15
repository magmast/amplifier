/**
 * Represents options for mapping a numerical value from one range to another.
 */
export interface MapValueOptions {
  /**
   * The input value to be mapped.
   */
  value: number;

  /**
   * The input range to map the value from, specified as an array of [minimum, maximum].
   */
  input: [min: number, max: number];

  /**
   * The output range to map the value to, specified as an array of [minimum, maximum].
   */
  output: [min: number, max: number];
}

/**
 * Maps a numerical value from one range to another using the provided options.
 *
 * @param options - The options for mapping the value.
 * @returns The mapped value in the output range.
 *
 * @example
 * const options: MapValueOptions = {
 *   value: 50,
 *   input: [0, 100],
 *   output: [0, 1],
 * };
 * const mappedValue = mapValue(options); // Returns 0.5
 *
 * @remarks
 * This function performs a linear interpolation to map the input value from the input range to the output range.
 * It calculates the corresponding value in the output range based on the ratio of the input value's position within the input range.
 * This can be useful for normalizing values, scaling values, or converting between different units of measurement.
 */
const mapValue = ({ value, input, output }: MapValueOptions): number =>
  ((value - input[0]) * (output[1] - output[0])) / (input[1] - input[0]) +
  output[0];

export default mapValue;
