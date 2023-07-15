import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Props for the EffectTitle component.
 */
export type EffectTitleProps = ComponentPropsWithoutRef<"h6">;

/**
 * EffectTitle component displays the title for an effect.
 * It can be customized using className and other props.
 */
const EffectTitle = ({ className, ...props }: EffectTitleProps) => (
  <h6 {...props} className={twMerge("mb-2 font-bold", className)} />
);

export default EffectTitle;
