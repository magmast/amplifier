import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Props for the EffectStat component.
 */
export type EffectStatProps = ComponentPropsWithoutRef<"p">;

/**
 * EffectStat component displays a statistic for an effect.
 * It can be customized using className and other props.
 */
const EffectStat = ({ className, ...props }: EffectStatProps) => (
  <p
    {...props}
    className={twMerge("mt-2 text-gray-600 font-mono", className)}
  />
);

export default EffectStat;
