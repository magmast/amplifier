import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Props for the EffectView component.
 */
export type EffectViewProps = ComponentPropsWithoutRef<"div">;

/**
 * EffectView component displays a view for an effect.
 * It can be customized using className and other props.
 */
const EffectView = ({ className, ...props }: EffectViewProps) => (
  <div
    {...props}
    className={twMerge(
      "bg-gray-100 p-2 rounded shadow flex flex-col items-center",
      className
    )}
  ></div>
);

export default EffectView;
