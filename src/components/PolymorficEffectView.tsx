import Effect from "../services/Effect";
import EffectViewFactory from "../services/EffectViewFactory";

/**
 * Props for the PolymorphicEffectView component.
 */
export interface PolymorphicEffectViewProps {
  /**
   * The Effect instance to be rendered.
   */
  effect: Effect;
}

/**
 * PolymorphicEffectView component renders a polymorphic view for an Effect.
 * The specific view component is determined by the EffectViewFactory based on the type of the Effect.
 *
 * @param props - The PolymorphicEffectView component props.
 * @returns The rendered Effect view component.
 */
const PolymorphicEffectView = ({ effect }: PolymorphicEffectViewProps) => (
  <>{effect.accept(new EffectViewFactory())}</>
);

export default PolymorphicEffectView;
