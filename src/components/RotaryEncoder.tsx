import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useCallback, useEffect, useRef } from "react";
import mapValue from "../utils/mapValue";

/**
 * Props for the RotaryEncoder component.
 */
export interface RotaryEncoderProps {
  /**
   * The minimum value of the encoder.
   * @default 0
   */
  min?: number;

  /**
   * The maximum value of the encoder.
   * @default 100
   */
  max?: number;

  /**
   * The number of rotations the encoder can make.
   * @default 2
   */
  rotations?: number;

  /**
   * The current value of the encoder.
   */
  value?: number;

  /**
   * The default value of the encoder if no value is provided.
   */
  defaultValue?: number;

  /**
   * Callback function called when the value changes.
   * @param value - The new value of the encoder.
   */
  onChange?: (value: number) => void;
}

/**
 * A rotary encoder component that allows selecting a value within a specified range by rotating it.
 *
 * @param props - The RotaryEncoder component props.
 * @returns The rendered RotaryEncoder component.
 */
const RotaryEncoder = ({
  min = 0,
  max = 100,
  defaultValue,
  value = defaultValue ?? min,
  rotations = 2,
  onChange,
}: RotaryEncoderProps) => {
  const calculateRotation = useCallback(
    (value: number) =>
      mapValue({ value, input: [min, max], output: [0, -360 * rotations] }),
    [max, min, rotations]
  );

  const rawValue = useRef(value);

  const [spring, api] = useSpring(() => ({
    from: {
      rotation: calculateRotation(rawValue.current),
    },
  }));

  useEffect(() => {
    rawValue.current = value;
    api.start({ rotation: calculateRotation(value) });
  }, [api, calculateRotation, value]);

  const bind = useDrag(({ delta }) => {
    const newValue = Math.max(
      min,
      Math.min(max, rawValue.current + delta[1] * (max - min) * -0.01)
    );
    rawValue.current = newValue;
    onChange && onChange(newValue);
    api.start({ rotation: calculateRotation(newValue) });
  });

  return (
    <animated.div
      {...bind()}
      className="w-16 h-16 bg-red-700 rounded-full relative touch-none cursor-pointer"
      style={{
        transform: spring.rotation.to((r) => `rotate(${r}deg)`),
      }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-900 rounded-full" />
    </animated.div>
  );
};

export default RotaryEncoder;
